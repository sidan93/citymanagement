import { SpriteFactory } from './sprite_factory';
import { MapLayer } from './mapLayer';
import { CHouse } from './gameObjects/structure/house';
import { CFactory } from './gameObjects/structure/factory';
import {WorldMap, Buildings, Regions} from '../both/collections';

class Map {
  static type = 'Map';

  static _phaser;

  static _worldMap = [];
  static _mapBuilding = [];

  static mapLayers = {
    Terrain: 'Terrain',
    Building: 'Building'
  }
  static _terrain;
  static _building;

  constructor() {
    throw new Error('Cannot construct singleton Map');
  }

  static init(phaser) {
    _this._phaser = phaser; 
    
    _this._terrain = new MapLayer('Terrain');
    _this._building = new MapLayer('Building');

    _this._worldMap = WorldMap.find();      
    _this._mapBuilding = Buildings.find();

    _this._grid = [];
    _this._grid_graphics = phaser.add.graphics({ lineStyle: { width: 5, color: 0xaa00aa, alpha: 0.6 } });
    _this._initGrid();
  }

  static draw() { 
    // Подписываемся на события, только во время отрисоки, иначе фазер еще может не гразануться
    _this._worldMap.observeChanges({
      added(key, value) {
        _this._drawWorldTerrain(value);
      }
    });
    _this._mapBuilding.observeChanges({
      added(key, value) {
        _this._drawWorldBuilding(key, value);
      },
      removed(key) {
        _this._removeWorldBuilding(key);
      }
    });

    _this._grid.forEach(element => {
      _this._grid_graphics.strokeLineShape(element);  
    });
  }

  static update() {
  }

  static addBuilding(structureKey, i, j) {
    // TODO Определение региона надо сделать по другому
    Buildings.insert({
      structureKey: structureKey,
      region: Regions.findOne()._id,
      position: {
        i: i,
        j: j
      }
    });
  }

  /* global Phaser */
  static _initGrid() {
    let _this = this;
    for (let i = 0; i < 100; i ++) {
      _this._grid.push(new Phaser.Geom.Line(i * 30, 0, i * 30, 100 * 30));
      _this._grid.push(new Phaser.Geom.Line(0, i * 30, 100 * 30, i * 30));
    }
  }

  static _drawWorldTerrain(item) {
    for (let i = 0; i < item.data.length; i++) {
      for (let j = 0; j < item.data[i].length; j++) {
        _this._phaser.make.sprite({
          key: SpriteFactory.get('grass_01'),
          x: i * 30,
          y: j * 30
        });
      }
    }
  }

  // Отрисовать здания
  static _drawWorldBuilding(key, item) {
    let structureList = [CHouse, CFactory]; 

    let CurStructure = structureList.find(i => i.key === item.structureKey);

    if (!CurStructure)
      throw 'Для отрисовки нет нужного строения ' + key; 

    // Найдем координаты здания и создадим его
    let cords = _this.indexToMap(item.position.i, item.position.j, SpriteFactory.getOffset(CurStructure.spriteKey));
    let structure = new CurStructure(key, _this._phaser, cords);

    // Добавим его в менедрж слоев
    _this._building.add(cords.i, cords.j, structure.objectKey, {
      structure: structure
    });
  }

  static _removeWorldBuilding(key) {
    let item = _this._building.getByObjectId(key);
    if (!item) {
      console.log(`Не удалось удалить строение с ключом ${key} т.к. его нет`);
      return;
    }

    item.structure.sprite.destroy();
    _this._building.removeByKey(key);
  }

  static indexToMap(i, j, offset) {
    return {
      i: i,
      j: j,
      x: offset ? i * 30 + offset.x: i * 30,
      y: offset ? j * 30 + offset.y: j * 30,
    };
  }

  static cordToMap(x, y, offset) {
    let i = parseInt(x / 30);
    let j = parseInt(y / 30);
    return {
      i: i,
      j: j,
      x: offset ? i * 30 + offset.x: i * 30,
      y: offset ? j * 30 + offset.y: j * 30,
    };
  }
}

let _this = Map;

export { Map };