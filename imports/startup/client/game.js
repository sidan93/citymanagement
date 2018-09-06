class Game {
  static _phaser = null;

  static _actionList = {
    None: 'None',
    StartBuild: 'StartBuild'
  }
  static _action = null;
  static _actionData = {};

  constructor(enforcer) {
    throw new Error('Cannot construct singleton Game');
  }

  static init(phaser) {
    _this._phaser = phaser;

    _this._action = _this._actionList.None;
  }

  static startBuild(buildKey) {
    _this._action = this._actionList.StartBuild;
    _this._actionData = {
      build: buildKey
    }
  }

  static build() {

  }
}

let _this = Game;

export { Game };