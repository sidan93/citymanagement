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
        building.people = {
          max: 10,
          curr: 0
        };
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

People.allow({
  insert: function(userId, people) {
    // Увеличим кол-во жителей в доме, при добавлении человека
    if (people.house) {
      let house = Buildings.findOne({_id: people.house});
      house.people.curr ++;
      if (house)
        Buildings.update({_id: house._id}, people);
    }
    if (people.work) {
      let factory = Buildings.findOne({_id: people.work});
      factory.people.curr++;
      if (factory)
        Buildings.update({_id: factory._id}, factory)
    }
    return true;
  },
  update: function() {
    return true;
  },
  remove: function(userId, people) {
    if (people.house) {
      
    }
    return true;
  }
})