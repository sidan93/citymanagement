import { SpriteFactory } from '../../sprite_factory'
import { BaseObject } from '../base'

class Building extends BaseObject {
  static getOffset() {
    return SpriteFactory.getOffset(this._spriteKey);
  }
}

export { Building };