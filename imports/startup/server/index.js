import { Meteor } from 'meteor/meteor'
import { startSide } from './sideLoop'
import '/imports/startup/both';

Meteor.startup(() => {
  startSide();
});


Meteor.methods({

});


Buildings.allow({
  insert: function(userID, building) {
    // TODO вынести в общий класс и сделать мультинаследование в клиенте
    switch (building.structureKey) {
      case 'house_03':
        building.people = {
          max: 50,
          curr: 0
        };
        return true;
      case 'road_01':
        return true;
      case 'factory':
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
})