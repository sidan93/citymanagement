class Mouse {
  static _phaser = phaser;

  static actionList = {

  };

  constructor(enforcer) {
    throw new Error('Cannot construct singleton Mouse');
  }

  static init(phaser) {
    _this._phaser = phaser;
  }
}

let _this = Mouse;

export { Mouse };