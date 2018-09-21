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
      // Если у нас действие рисования, то необходимо передвинуть наш спрайт за мышкой
      if (_this._action && _this._action == _this._actionList.StartBuild && _this._actionData.sprite) {
        let cords = _this._phaser.cameras.main.getWorldPoint(pointer.x, pointer.y);
        let newCords = Map.cordToMap(cords.x, cords.y, SpriteFactory.getOffset(_this._actionData.structureKey));
        _this._actionData.sprite.i = newCords.i;
        _this._actionData.sprite.j = newCords.j;
        _this._actionData.sprite.x = newCords.x;
        _this._actionData.sprite.y = newCords.y;
      }
    });

    _this._phaser.input.on('pointerdown', function(pointer) {
      // Если мы строим, то при нажатии надо построить здание
      if (_this._action === _this._actionList.StartBuild) {
        _this.build();
      }
    });
  }

  static startBuild(structureKey) {
    _this._action = _this._actionList.StartBuild;
    let sprite = SpriteFactory.getSprite(structureKey, -100, -100);
    _this._actionData = {
      structureKey: structureKey,
      sprite: sprite,
    }
  }

  static build() {
    if(_this._action === _this._actionList.StartBuild) {
      Map.addBuilding(_this._actionData.structureKey, _this._actionData.sprite.i, _this._actionData.sprite.j);
      _this.resetAction();
    }
  }

  static resetAction() {
    if (_this._actionData.sprite)
      _this._actionData.sprite.destroy();

    _this._action = _this._actionList.None;
    _this._actionData = {
      sprite: null
    };
  }
}

let _this = Game;

export { Game };