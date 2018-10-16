import { Buildings, Regions, People } from '../../../both/collections';
import { House } from '../../../both/gameObject/house';
import { InterfaceManager } from '../../interface/manager';

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
    });

    // Подготовим курсор
    this.cursor = Buildings.find({_id: objectKey});

    // Активируем на событие
    this.sprite.setInteractive();
    let _this = this;
    this.sprite.on('pointerdown', function(pointer) {
      if (pointer.buttons === 1) {
        InterfaceManager.showInfo(_this, _this.getInfo());
      }
      else if (pointer.buttons === 2)
        Buildings.remove({_id: _this.objectKey});
    });
  }

  getInfo() {
    // TODO сделать через fetch
    let object = Buildings.findOne({_id: this.objectKey});
    if (!object) return null;
    let region = Regions.findOne({_id: object.region});
    return {
      title: 'Дом',
      position: object.position,
      people: object.people,
      peopleNames: People.find({house: object._id}).map(i => i.name),
      region: region ? region.name : null
    };
  }
}

export { CHouse };