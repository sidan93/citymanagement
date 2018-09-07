import { SpriteFactory } from '../sprite_factory'

class Building extends Phaser.GameObjects.Sprite {
  id = 'IdNull';
  static _spriteKey = 'house_03'

  constructor(scene, id, cords) {
    super(scene, cords.x, cords.y, Building._spriteKey);
    this.id = id;
  }

  static getOffset() {
    return SpriteFactory.getOffset(Building._spriteKey);
  }
}

export { Building };