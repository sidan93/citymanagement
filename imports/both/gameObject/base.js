class BaseObject {
  static key = null;
  static collection = null;

  constructor(objectKey) {
    this.objectKey = objectKey;
  }

  getObject() {
    if (!this.collection)
      return null;
    return this.collection.findOne({_id: this.objectKey});
  }
}

export { BaseObject };