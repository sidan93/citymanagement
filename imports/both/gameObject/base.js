import { Buildings } from '../collections';
import { interRect } from '../utils/utils'

class BaseObject {
  static key = null;
  static collection = null;
  static size = null;
  static childList = [];

  constructor(objectKey) {
    this.objectKey = objectKey;
  }

  getObject() {
    if (!this.collection)
      return null;
    return this.collection.findOne({_id: this.objectKey});
  }

  getIntance() {
    
  }
  
  static getInstanceByKey(key) {
    for (let inst of BaseObject.childList) {
      if (inst.key === key)
        return inst;
    }
  }

  static checkCreated(region, i, j, creature) {
    let buildList = Buildings.find().fetch();
    for (let building of buildList) {
      let buildObject = BaseObject.getInstanceByKey(building.structureKey);
      let buildObjectCreated = BaseObject.getInstanceByKey(creature);
      if (interRect(
          building.position.i, building.position.j, buildObject.size.i, buildObject.size.j, 
          i, j, buildObjectCreated.size.i, buildObjectCreated.size.j
        )) {
        return false;
      }
    }
    return true;
  }
}

export { BaseObject };