import { vSelectedObject, vRegionObject } from './vars'
import { BaseObject } from '../../both/gameObject/base'
import { Region } from '../../both/region'

class InterfaceManager {
  constructor(enforcer) {
    throw new Error('Cannot construct singleton InterfaceManager');
  }

  static showInfo(owner, info) {
    if (owner instanceof BaseObject) {
      vRegionObject.set(null);
      vSelectedObject.set(info)
    }
    if (owner instanceof Region) {
      vSelectedObject.set(null);
      vRegionObject.set(info);
    }
  }

  static resetInfo() {
    vSelectedObject.set(null);
    vRegionObject.set(null);
  }
}

let _this = InterfaceManager;

export { InterfaceManager }