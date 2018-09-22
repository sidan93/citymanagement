import { Building } from './building'

class Factory extends Building {
  static _spriteKey = 'factory';

  constructor(scene, id, cords, info) {
    super(scene, id, cords, Factory._spriteKey, info);

    this.info.structure_name = 'Фабрика';
  }

  getInfo(additionInfo, factoryRecord) {
    let recordInfo = {};
    if (factoryRecord) {
      recordInfo = {
        title: 'Фабрика',
        position: factoryRecord.position,
        people: factoryRecord.people,
        peopleNames: People.find({factory: factoryRecord._id}).map(i => i.name)
      }
    }
    return super.getInfo({...additionInfo, ...recordInfo});
  }
}

export { Factory };