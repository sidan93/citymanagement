import { vSelectedObject, vRegionObject, vNotification } from './vars';
import { BaseObject } from '../../both/gameObject/base';
import { Region } from '../../both/region';
import { Regions, People } from '../../both/collections';

class InterfaceManager {
  constructor() {
    throw new Error('Cannot construct singleton InterfaceManager');
  }

  static initNotification() {
    let peopleCursor = People.find({region: Regions.findOne()._id});
    peopleCursor.observeChanges({
      added(key, people) {
        _this.showNotification(
          'Новый житель!',
          `${people.name} поселился в доме ${people.house} и работой ${people.work}`,
          10000);
        console.log('создаем уведомление');
      }
    });
  }

  static showNotification(title, message, time) {
    let notification = {
      title: title,
      text: message
    };
    let key = message;
    vNotification.set(key, notification);
    setTimeout(function() {
      vNotification.delete(key);
    }, time);
  }

  static showInfo(owner, info) {
    if (owner instanceof BaseObject) {
      vRegionObject.set(null);
      vSelectedObject.set(info);
    }
    if (owner instanceof Region) {
      vSelectedObject.set(null);
      vRegionObject.set(info);
    }
  }

  static resetInfo() {
    vSelectedObject.set(null);
    vRegionObject.set(null);
  }
}

let _this = InterfaceManager;

export { InterfaceManager };