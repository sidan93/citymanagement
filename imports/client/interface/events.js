import { Game } from '../game'
import { vSelectedObject, vRegionObject } from './vars'
import { CFactory } from '../gameObjects/structure/factory'
import { CHouse } from '../gameObjects/structure/house'
import { Region } from '../../both/region'
import _ from 'lodash'

import '/client/main.html'


Template.overlay.events({
  'click .button1': function() {
    vRegionObject.set(null);
    vSelectedObject.set(null);
    Game.startBuild(CHouse);
  },
  'click .button2': function() {
    vRegionObject.set(null);
    vSelectedObject.set(null);
    Game.startBuild(CFactory);
  },
  'click .button4': function() {
    Game.resetAction();
    vRegionObject.set(null);
    vSelectedObject.set(null);
  },
  'click .button5': function() {
    Game.resetAction();
    vSelectedObject.set(null);

    let region = new Region(null, Regions.findOne());
    let people = People.find({region: region.id}).fetch();
    let building = Buildings.find({region: region.id}).fetch();
    let house = building.filter(i => i.structureKey === CHouse.key);
    let factory = building.filter(i => i.structureKey === CFactory.key);

    vRegionObject.set({
      title: 'Регион: Основной',
      id: region.id,

      countHouse: house.length,
      countFactory: factory.length,
      countPeople: people.length,
      countFreeHousePlace: _.sum(house.map(i => i.people.max - i.people.curr)),
      countFreeFactoryPlace: _.sum(factory.map(i => i.people.max - i.people.curr)),
      attractiveness: region.getAttractiveness()
    });
  }
});

Template.overlay.helpers({
  getSelectedInfo: function() {
    return vSelectedObject.get();
  },
  getRegionInfo: function() {
    return vRegionObject.get();
  }
});