import { Game } from '../game'
import { vSelectedObject } from './vars'
import { Factory } from '../gameObjects/structure/factory'
import { CHouse } from '../gameObjects/structure/house'
import { Road } from '../gameObjects/road'

import '/client/main.html'


Template.overlay.events({
  'click .button1': function() {
    Game.startBuild(CHouse);
  },
  'click .button2': function() {
    Game.startBuild(Factory);
  },
  'click .button3': function() {
    Game.startBuild(Road);
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