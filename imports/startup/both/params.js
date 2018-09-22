class Params {
  static version = 'version';
  static lastUpdateTime = 'lastUpdateTime'
  static CURR_VERSION = '0.0.1';

  static get(paramKey) {
    return ServerInfo.findOne({name: paramKey});
  }

  static set(paramKey, value) {
    return ServerInfo.upsert({name: paramKey}, {name: paramKey, value: value});
  }
}

let _this = Params;

export { Params };