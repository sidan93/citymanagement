class MapLayer {
  _data = {};
  _matching = {};
  _name = '';

  constructor(name) {
    this.name = name;
  }

  add(i, j, objectKey, value) {
    let hash = this.getHash(i, j)
    this._data[hash] = value;
    this._matching[objectKey] = hash;
  }

  has(i, j) {
    return this._data.hasOwnProperty(this.getHash(i, j));
  }

  getByIndex(i, j) {
    return this._data[this.getHash(i,j)];
  }

  getByObjectId(key) {
    return this._data[this._matching[key]];
  }

  get(hash) {
    return this._data[hash];
  }

  getHash(i, j) {
    return String(i) + '_' + String(j);
  }

  removeByKey(key) {
    // todo не удаляем сам объект, который находится внутри
    delete this._data[this._matching[key]];
    delete this._matching[key];
  }
};

export { MapLayer };