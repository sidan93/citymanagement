import { ServerInfo } from './collections';

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

export { Params };