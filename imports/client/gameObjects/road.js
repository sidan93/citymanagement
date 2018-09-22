import { SpriteFactory } from '../sprite_factory'
import { BaseObject } from './base'


class Road extends BaseObject {
  static _spriteKey = 'road_01';

  constructor(scene, id, cords, info) {
    super(scene, id, cords, Road._spriteKey, info);
  }

  static getOffset() {
    return SpriteFactory.getOffset(Road._spriteKey);
  }
}

export { Road };