class BaseObject extends Phaser.GameObjects.Sprite {
  id = 'IdNull';  
  _localSpriteKey = null;

  constructor(scene, id, cords, spriteKey) {
    super(scene, cords.x, cords.y, spriteKey);
    this.id = id;
    this._localSpriteKey = spriteKey;
  }
}

export { BaseObject };