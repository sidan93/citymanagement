import { Game } from '../game'
import { vSelectedObject } from './vars'
import { CFactory } from '../gameObjects/structure/factory'
import { CHouse } from '../gameObjects/structure/house'

import '/client/main.html'


Template.overlay.events({
  'click .button1': function() {
    Game.startBuild(CHouse);
  },
  'click .button2': function() {
    Game.startBuild(CFactory);
  },
  'click .button4': function() {
    Game.resetAction();
  }
});

Template.overlay.helpers({
  getSelectedInfo: function() {
    return vSelectedObject.get();
  }
});