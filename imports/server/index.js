import { Meteor } from 'meteor/meteor'
import { startSide } from './sideLoop'
import { House } from '../both/gameObject/house'
import '/imports/both';
import './initServer' 
import './triggers'

Meteor.startup(() => {
  startSide();
});


Meteor.methods({

});


Buildings.allow({
  insert: function(userID, building) {
    // TODO вынести в общий класс и сделать мультинаследование в клиенте
    switch (building.structureKey) {
      case House.key:
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

