import { SpriteFactory } from './sprite_factory';
import { Map } from './map';
import { InterfaceManager } from './interface/manager';
import { BaseObject } from '../both/gameObject/base';

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

  constructor() {
    throw new Error('Cannot construct singleton Game');
  }

  static init(phaser) {
    _this._phaser = phaser;

    _this.resetAction();

    _this._phaser.input.on('pointermove', function(pointer) {
      let cords = _this._phaser.cameras.main.getWorldPoint(pointer.x, pointer.y);
      // Если у нас действие рисования, то необходимо передвинуть наш спрайт за мышкой
      if (_this._action && _this._action == _this._actionList.StartBuild && _this._actionData.sprite) {
        let newCords = Map.cordToMap(cords.x, cords.y, SpriteFactory.getOffset(_this._actionData.spriteKey));
        _this._actionData.sprite.i = newCords.i;
        _this._actionData.sprite.j = newCords.j;
        _this._actionData.sprite.x = newCords.x;
        _this._actionData.sprite.y = newCords.y;
      }

      // info for debug panel
      let additCords = Map.cordToMap(cords.x, cords.y);
      additCords.x = cords.x;
      additCords.y = cords.y;
      InterfaceManager.setDebugInfo(additCords);
    });

    _this._phaser.input.on('pointerdown', function() {
      // Если мы строим, то при нажатии надо построить здание
      if (_this._action === _this._actionList.StartBuild) {
        _this.build();
      }
    });
  }

  /**
   * Начать стрительство указанного здания
   * @param {BaseObject} structure Класс строющего объекта
   */
  static startBuild(structure) {
    _this._action = _this._actionList.StartBuild;
    let sprite = SpriteFactory.getSprite(structure.spriteKey, -100, -100);
    _this._actionData = {
      structureKey: structure.key,
      spriteKey: structure.spriteKey,
      sprite: sprite,
    };
  }

  static build() {
    if(_this._action === _this._actionList.StartBuild) {
      if (!BaseObject.checkCreated(0, _this._actionData.sprite.i, _this._actionData.sprite.j,  _this._actionData.structureKey)) {
        InterfaceManager.showNotification('Строительство', 'Нельзя построить здание', 3000);
      } else {
        Map.addBuilding(_this._actionData.structureKey, _this._actionData.sprite.i, _this._actionData.sprite.j);
      }
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