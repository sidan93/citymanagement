import { SpriteFactory } from './sprite_factory';
import { Map } from './map';

class Game {
  static _phaser = null;

  static _actionList = {
    None: 'None',
    StartBuild: 'StartBuild'
  }
  static _action = null;
  static _actionData = {
    sprite: null
  };

  constructor(enforcer) {
    throw new Error('Cannot construct singleton Game');
  }

  static init(phaser) {
    _this._phaser = phaser;

    _this.resetAction();

    _this._phaser.input.on('pointermove', function(pointer) {
      if (_this._action && _this._actionData.sprite) {
        let cords = _this._phaser.cameras.main.getWorldPoint(pointer.x, pointer.y);
        let newCords = Map.cordToMap(cords.x, cords.y, SpriteFactory.getOffset(_this._actionData.build));
        _this._actionData.sprite.x = newCords.x;
        _this._actionData.sprite.y = newCords.y;
      }
    });
  }

  static startBuild(buildKey) {
    _this._action = _this._actionList.StartBuild;
    let sprite = SpriteFactory.getSprite('house_03', -100, -100);
    _this._actionData = {
      build: buildKey,
      sprite: sprite,
    }
  }

  static build(x, y) {
    // TODO строительство должно быть у карты т.к. она должна знать об этом, а может и нет
    if(_this._action === _this._actionList.StartBuild) {
      Buildings.insert({
        position: {
          building: _this._actionData.build,
          x: x,
          y: y
        }
      });

      _this.resetAction();
    }
  }

  static resetAction() {
    _this._action = _this._actionList.None;
    _this._actionData = {
      sprite: null
    };
  }
}

let _this = Game;

export { Game };