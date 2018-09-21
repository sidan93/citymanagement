class BaseObject extends Phaser.GameObjects.Sprite {
  id = 'IdNull';  
  _localSpriteKey = null;
  info = {};

  constructor(scene, id, cords, spriteKey, info) {
    super(scene, cords.x, cords.y, spriteKey);
    this.id = id;
    this._localSpriteKey = spriteKey;
    this.info = info || {};
  }

  getInfo() {
    return this.info;
  }
}

export { BaseObject };