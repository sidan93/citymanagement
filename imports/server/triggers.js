import * as faker from 'faker';

People.before.insert(function(userId, people) {
  if (!people.name)
    people.name = faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}');
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
});

Buildings.after.insert(function(userId, building) {
  console.log(`Построено здание ${JSON.stringify(building)}`);
});

Buildings.after.remove(function(userId, building) {
  if (building.structureKey === 'house_03') {
    People.remove({house: building._id});
  }
  if (building.structureKey === 'factory') {
    People.update({work: building._id}, {$set: {work: null}});
  }

  console.log(`Разрушено здание ${JSON.stringify(building)}`);
});
