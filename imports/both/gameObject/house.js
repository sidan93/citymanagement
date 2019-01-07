import { BaseObject } from './base';

class House extends BaseObject {
  static key = 'house';
  static collection = 'Buildings';
  static maxPeople = 50;
  static size = {i: 3, j: 2};

  constructor(objectKey) {
    super(objectKey);
  }
}

BaseObject.childList.push(House);

export { House };