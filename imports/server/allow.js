import { House } from '../both/gameObject/house';
import { Factory } from '../both/gameObject/factory';

Buildings.allow({
  insert: function(userID, building) {
    switch (building.structureKey) {
      case House.key:
        building.people = {
          max: House.maxPeople,
          curr: 0
        };
        // todo привяжем к единственному региону
        building.region = Regions.findOne()._id;
        return true;
      case Factory.key:
        building.people = {
          max: Factory.maxPeople,
          curr: 0
        };
        // todo привяжем к единственному регину
        building.region = Regions.findOne()._id;
        return true;
      default:
        return false;
    }
  },
  remove: function(userId, building) {
    return true;
  },
  update: function(userId, building) {
    return true;
  }
});

