import { SpriteFactory } from '../sprite_factory'
import { BaseObject } from './base'

class Building extends BaseObject {
  static _spriteKey = 'house_03';

  constructor(scene, id, cords, info) {
    super(scene, id, cords, Building._spriteKey, info);
  }

  static getOffset() {
    return SpriteFactory.getOffset(Building._spriteKey);
  }
}

export { Building };