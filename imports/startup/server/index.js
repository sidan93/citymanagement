import { Meteor } from 'meteor/meteor'
import { startSide } from './sideLoop'
import { init } from './initServer' 
import '/imports/startup/both';

Meteor.startup(() => {
  init();
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


People.after.insert(function(userId, people) {
  // Увеличим кол-во жителей в доме, при добавлении человека
  if (people.house) {
    Buildings.update({_id: people.house}, { $inc: { 'people.curr': 1 } }, { multi: true });
  }
  if (people.work) {
    Buildings.update({_id: people.work}, { $inc: { 'people.curr': 1 } }, { multi: true });
  }
});

People.before.remove(function(userId, people) {
  if (people.house) {
    Buildings.update({_id: people.house}, { $inc: { 'people.curr': -1 } }, { multi: true });
  }
  if (people.work) {
    Buildings.update({_id: people.work}, { $inc: { 'people.curr': -1 } }, { multi: true });
  }
});