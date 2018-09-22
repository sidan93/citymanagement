import { Building } from './building'

class Factory extends Building {
  static _spriteKey = 'factory';

  constructor(scene, id, cords, info) {
    super(scene, id, cords, Factory._spriteKey, info);

    this.info.structure_name = 'Фабрика';
  }

  getInfo(additionInfo, factoryRecord) {
    let recordInfo = {
      pos: 'Позиция ${factoryRecord.pos}'
    };
    return super.getInfo({...additionInfo, ...recordInfo});
  }
}

export { Factory };