import { Factory } from '../../../both/gameObject/factory';
import { vSelectedObject } from '../../interface/vars'

class CFactory extends Factory {
  static spriteKey = 'factory';
  
  constructor(objectKey, phaser, cords) {
    super(objectKey);

    this.spriteKey = CFactory.spriteKey;
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
      title: 'Фабрика',
      position: object.position,
      people: object.people,
      peopleNames: People.find({work: object._id}).map(i => i.name)
    };
  }
}

export { CFactory };