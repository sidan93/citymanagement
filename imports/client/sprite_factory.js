import { assetsList } from './sprite_assets';

class SpriteFactory {
  static type = 'SpriteFactory';

  static _loadedImage = [];
  static _phaser;

  constructor() {
    throw new Error('Cannot construct singleton SpriteFactory');
  }

  static init(phaser) {
    _this._phaser = phaser;

    // Загрузим основные данные
    Object.values(assetsList).forEach(function(sprite) {
      _this._loadSprite(sprite);
    });
  }

  /**
   * Получить ключ спрайт     
   * @param {str} name Имя спрайта 
   */
  // TODO Пока что не используем основной механизм, т.к. не несет ни какой функциональности
  static get(name) {
    return name;
    /* eslint no-unreachable: off */
    // Подгрузим спрайт, если его нет
    // TODO Это может быть долго, думаю надо будет в дальнейшем убрать проверку или оптимизировать
    if (_this._loadedImage.includes(name))
      return name;
      
    // TODO Автоподрузка резуализуется асинхронно, поэтому в начале реализуем загрузку всего
    throw 'Данный спрайт не подгружен в начале ' + name;
      
    let sprite = assetsList[name];

    if (!sprite)
      throw 'Данного спрайта нет в списке загружаемых ' + name; 

    this._loadSprite(sprite);
  }

  static getSprite(key, x, y) {
    return _this._phaser.make.sprite({
      key: key,
      x: x,
      y: y
    });
  }

  static getOffset(spriteKey) {
    return assetsList[spriteKey].offset;
  }

  static _loadSprite(sprite) {
    _this._phaser.load.image(sprite.key, '/assets/' + sprite.file);
    _this._loadedImage.push(sprite.key);
  }
}
let _this = SpriteFactory;

  
export { SpriteFactory };
