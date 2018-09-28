import { Meteor } from 'meteor/meteor'
import { startSide } from './sideLoop'
import '/imports/both';
import './initServer' 
import './triggers'
import './allow'

Meteor.startup(() => {
  startSide();
});


Meteor.methods({

});
