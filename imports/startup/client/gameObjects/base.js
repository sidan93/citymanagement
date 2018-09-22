class BaseObject extends Phaser.GameObjects.Sprite {
  id = 'IdNull';  
  _localSpriteKey = null;
  info = {};

  static _spriteKey = null;

  constructor(scene, id, cords, spriteKey, info) {
    super(scene, cords.x, cords.y, spriteKey);
    this.id = id;
    this._localSpriteKey = spriteKey;
    this.info = info || {};
  }

  getInfo(additionInfo) {
    additionInfo = additionInfo || {};
    return {...this.info, ...additionInfo};
  }

  static getSpriteKey() {
    return this._spriteKey;
  }
}

export { BaseObject };