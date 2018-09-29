import { House } from './gameObject/house';
import { Factory } from './gameObject/factory';
import _ from 'lodash'

class Region {
  constructor(id, object) {
    this.id = id;

    if (object) {
      this.id = object._id;
    }
  }

  getRegion() {
    return Regions.findOne({_id: this.id});
  }

  getAttractiveness() {
    // от 0 до 100 в процентах

        // найдем кол-во свободных квартир
    let flatInfo = Buildings.find({region: this.id, structureKey: House.key}).map(i => i.people);
    let freeFlat = _.sum(flatInfo.map(i => i.max - i.curr));
    let currFlat = _.sum(flatInfo.map(i => i.curr));
    let maxFlat = _.sum(flatInfo.map(i => i.max));

    // найдем кол-во свободных рабочих мест
    let workInfo = Buildings.find({region: this.id, structureKey: Factory.key}).map(i => i.people);
    let freeWork = _.sum(workInfo.map(i => i.max - i.curr));
    let currWork = _.sum(workInfo.map(i => i.curr));
    let maxWork = _.sum(workInfo.map(i => i.max));

    // 100% от квартир, если негде жить, жители не приезжают
    if (!freeFlat)
        return 0;
    
    let currAttractiveness = 100;

    // если нет работы, то -%
    if (!freeWork)
      currAttractiveness -= 85;  
      
    // чем больше район, тем больше привлекательность
    // нормой считаем 100
    if (currFlat < 100)
      currAttractiveness -= 0.9 * (100 - currFlat);
    else 
      currAttractiveness += 0.1 * (currFlat - 100);

    return _.round(currAttractiveness, 0);

  }
}

export { Region };
