import { Game } from '../game';
import { CFactory } from '../gameObjects/structure/factory';
import { CHouse } from '../gameObjects/structure/house';
import { Region } from '../../both/region';
import _ from 'lodash';
import { vSelectedObject, vRegionObject, vNotification, vDebugInfo } from './vars';
import { InterfaceManager } from './manager';
import { Regions, Buildings, People } from '../../both/collections';

import '/client/main.html';

/* global Template */
Template.overlay.events({
  'click .button1': function() {
    Game.startBuild(CHouse);
  },
  'click .button2': function() {
    Game.startBuild(CFactory);
  },
  'click .button4': function() {
    Game.resetAction();
    InterfaceManager.resetInfo();
  },
  'click .button5': function() {
    Game.resetAction();

    let region = new Region(null, Regions.findOne());
    let people = People.find({region: region.id}).fetch();
    let building = Buildings.find({region: region.id}).fetch();
    let house = building.filter(i => i.structureKey === CHouse.key);
    let factory = building.filter(i => i.structureKey === CFactory.key);

    InterfaceManager.showInfo(region, {
      title: 'Регион: Основной',
      id: region.id,

      countHouse: house.length,
      countFactory: factory.length,
      countPeople: people.length,
      countPeopleWithoutWork: people.filter(i => !i.work).length,
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
  },
  getNotification: function() {
    vNotification.allDeps.depend();
    return Object.values(vNotification.keys).map(i=>JSON.parse(i));
  },
  getDebugInfo: function() {
    return vDebugInfo.get();
  }
});