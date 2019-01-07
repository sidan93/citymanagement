import { BaseObject } from './base';

class Factory extends BaseObject {
  static key = 'factory';
  static collection = 'Buildings';
  static maxPeople = 10;
  static size = {i: 3, j: 2};

  constructor(objectKey) {
    super(objectKey);
  }
}

BaseObject.childList.push(Factory);

export { Factory };