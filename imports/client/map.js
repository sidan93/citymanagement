import { SpriteFactory } from './sprite_factory'
import { MapLayer } from './mapLayer'
import { Road } from './gameObjects/road'
import { vSelectedObject } from './interface/vars'
import { CHouse } from './gameObjects/structure/house'
import { Factory } from './gameObjects/structure/factory'

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

  constructor(enforcer) {
    throw new Error('Cannot construct singleton Map');
  }

  static init(phaser) {
    _this._phaser = phaser; 
    
    _this._terrain = new MapLayer('Terrain');
    _this._building = new MapLayer('Building');

    _this._worldMap = WorldMap.find();  
    
    _this._mapBuilding = Buildings.find();
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
      }
    });
  }

  static addBuilding(structureKey, i, j) {
    Buildings.insert({
      structureKey: structureKey,
      position: {
        i: i,
        j: j
      }
    })
  }

  static _reload(i, j, layer) {
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
    let structureList = [CHouse]; 

    let CurStructure = structureList.find(i => i.key === item.structureKey);

    if (!CurStructure)
      throw 'Для отрисовки нет нужного строения ' + key; 

    // Найдем координаты здания и создадим его
    let cords = _this.indexToMap(item.position.i, item.position.j, SpriteFactory.getOffset(CurStructure.spriteKey));
    let structure = new CurStructure(key, _this._phaser, cords);

    // Добавим его в менедрж слоев
    _this._building.add(cords.i, cords.j, {
      structure: structure
    });
  }

  static indexToMap(i, j, offset) {
    return {
      i: i,
      j: j,
      x: offset ? i * 30 + offset.x: i * 30,
      y: offset ? j * 30 + offset.y: j * 30,
    }
  }

  static cordToMap(x, y, offset) {
    let i = parseInt(x / 30);
    let j = parseInt(y / 30);
    return {
      i: i,
      j: j,
      x: offset ? i * 30 + offset.x: i * 30,
      y: offset ? j * 30 + offset.y: j * 30,
    }
  }
}

let _this = Map;

export { Map };