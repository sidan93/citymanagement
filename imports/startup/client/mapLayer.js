class MapLayer {
  _data = {};
  _name = '';

  constructor(name) {
    this.name = name;
  }

  add(i, j, value) {
    this._data[this.getHash(i, j)] = value;
  }

  has(i, j) {
    return this._data.hasOwnProperty(this.getHash(i, j));
  }

  getByIndex(i, j) {
    return this._data[this.getHash(i,j)];
  }

  get(hash) {
    return this._data[hash];
  }

  getHash(i, j) {
    return String(i) + '_' + String(j);
  }
};

export { MapLayer };