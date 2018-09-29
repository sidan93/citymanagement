import { House } from './gameObject/house';
import { Factory } from './gameObject/factory';
import _ from 'lodash'

class Region {
  constructor(id, object) {
    this.id = id;

    if (object) {
      this._id = object._id;
    }
  }

  getRegion() {
    return Regions.findOne({_id: this.id});
  }

  getAttractiveness() {
    // от 0 до 100 в процентах

        // найдем кол-во свободных квартир
    let flatInfo = Buildings.find({region: this._id, structureKey: House.key}).map(i => i.people);
    let freeFlat = _.sum(flatInfo.map(i => i.max - i.curr));
    let maxFlat = flatInfo.length ? flatInfo.reduce((a, b) => a.max + b.max) : 0;

    // найдем кол-во свободных рабочих мест
    let workInfo = Buildings.find({region: this._id, structureKey: Factory.key}).map(i => i.people);
    let freeWork = _.sum(workInfo.map(i => i.max - i.curr));
    let maxWork = workInfo.length ? workInfo.reduce((a, b) => a.max + b.max) : 0;

    // 100% от квартир, если негде жить, жители не приезжают
    if (!freeFlat)
        return 0;
    
    let currAttractiveness = 100;

    // если нет работы, то -70%
    if (!freeWork)
      currAttractiveness -= 70;    

    return currAttractiveness;

  }
}

export { Region };
