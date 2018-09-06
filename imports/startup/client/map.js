import { SpriteFactory } from './sprite_factory'

class Map {
  static type = 'Map';

  static _phaser;

  static _terrain = [];
  static _building = [];

  constructor(enforcer) {
    throw new Error('Cannot construct singleton Map');
  }

  static init(phaser) {
    _this._phaser = phaser; 
    _this._terrain = WorldMap.find().fetch();        
    _this._building = Buildings.find().fetch();
  }

  static draw() {
    _this._drawSquare();

    _this._building.forEach(item => {
      SpriteFactory.getSprite('house_03', item.position.x, item.position.y);
    });
  }

  static _drawGex() {
    // TODO пока что отказываюсь, т.к. долго делать
    _this._terrain.forEach(item => {
      for (let i = 0; i < item.data.length; i++) {
        for (let j = 0; j < item.data[i].length; j++) {
          _this._phaser.make.sprite({
            key: item.data[i][j].terrain % 2 ? SpriteFactory.get('gex_terr2') : SpriteFactory.get('gex_grass2'),
            x: i * 22,
            y: i % 2 ? j * 29 - 15 : j * 29
          });
        }
      }
    });
  }

  static _drawSquare() {
    _this._terrain.forEach(item => {
      for (let i = 0; i < item.data.length; i++) {
        for (let j = 0; j < item.data[i].length; j++) {
          _this._phaser.make.sprite({
            key: SpriteFactory.get('grass_01'),
            x: i * 30,
            y: j * 30
          });
        }
      }
    });
  }

  static cordToMap(x, y, offset) {
    let i = parseInt(x / 30);
    let j = parseInt(y / 30);
    return {
      i: i,
      j: j,
      x: offset ? i*30 + offset.x: i*30,
      y: offset ? j*30 + offset.y: j*30,
    }
  }
}

let _this = Map;

export { Map };