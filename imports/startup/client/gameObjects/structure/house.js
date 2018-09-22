import { Building } from './building'

class House extends Building {
  static _spriteKey = 'house_03';  
  
  constructor(scene, id, cords, info) {
    super(scene, id, cords, House._spriteKey, info);
  }

  getInfo(additionInfo, houseRecord) {
    let recordInfo = {};
    if (houseRecord)
    recordInfo = {
      title: 'Дом',
      position: houseRecord.position,
      people: houseRecord.people
    };
    return super.getInfo({...additionInfo, ...recordInfo});
  }
}

export { House };