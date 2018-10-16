class Mouse {
  static _phaser;

  static actionList = {

  };

  constructor() {
    throw new Error('Cannot construct singleton Mouse');
  }

  static init(phaser) {
    _this._phaser = phaser;
  }
}

let _this = Mouse;

export { Mouse };