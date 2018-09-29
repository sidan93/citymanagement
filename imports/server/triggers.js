import { House } from '../both/gameObject/house'
import { Factory } from '../both/gameObject/factory'
import faker from 'faker'

People.before.insert(function(userId, people) {
  if (!people.name)
    people.name = faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}');
  if (!people.region) {
    let house = Buildings.findOne({_id: people.house});
    if (!house)
      throw `У жителя нет дома ${JSON.stringify(people)}`;
    people.region = house.region;
  }
});

People.after.insert(function(userId, people) {
  // Увеличим кол-во жителей в доме, при добавлении человека
  if (people.house) {
    Buildings.update({_id: people.house}, {$inc: {'people.curr': 1}}, {multi: true});
  }
  if (people.work) {
    Buildings.update({_id: people.work}, {$inc: {'people.curr': 1}}, {multi: true});
  }

  console.log(`Поселился человек ${people.name} в дом ${people.house} с работой ${people.work}`);
});

People.after.remove(function(userId, people) {
  if (people.house) {
    Buildings.update({_id: people.house}, {$inc: {'people.curr': -1}}, {multi: true});
  }
  if (people.work) {
    Buildings.update({_id: people.work}, {$inc: {'people.curr': -1}}, {multi: true});
  }

  console.log(`Уехал человек ${people.name} из дома ${people.house}`);
});

Buildings.after.insert(function(userId, building) {
  console.log(`Построено здание ${JSON.stringify(building)}`);
});

Buildings.after.remove(function(userId, building) {
  if (building.structureKey === House.key) {
    People.remove({house: building._id});
  }
  if (building.structureKey === Factory.key) {
    People.update({work: building._id}, {$set: {work: null}});
  }

  console.log(`Разрушено здание ${JSON.stringify(building)}`);
});
