import { BaseObject } from './base';

class Factory extends BaseObject {
  static key = 'factory';
  static collection = 'Buildings';
  static maxPeople = 10;

  constructor(objectKey) {
    super(objectKey);
  }
}

export { Factory };