import { House } from '../../../both/gameObject/house'
import { vSelectedObject } from '../../interface/vars'

class CHouse extends House {
  static spriteKey = 'house_03';
  
  constructor(objectKey, phaser, cords) {
    super(objectKey);

    this.spriteKey = CHouse.spriteKey;
    this.cords = cords;

    this.sprite = phaser.make.sprite({
      key: this.spriteKey,
      x: cords.x,
      y: cords.y
    })

    // Подготовим курсор
    this.cursor = Buildings.find({_id: objectKey});

    // Активируем на событие
    this.sprite.setInteractive();
    let _this = this;
    this.sprite.on('pointerdown', function(pointer) {
      vSelectedObject.set(_this.getInfo());
    });
  }

  getInfo() {
    // TODO сделать через fetch
    let object = Buildings.findOne({_id: this.objectKey});
    if (!object) return null;
    return {
      title: 'Дом',
      position: object.position,
      people: object.people,
      peopleNames: People.find({house: object._id}).map(i => i.name)
    };
  }
}

export { CHouse };