import { Meteor } from 'meteor/meteor'
import * as faker from 'faker'
import '/imports/both'

function startSide() {
  console.log('Запускаем фоновую обработку мира');
  Meteor.setTimeout(side, 0);
}

function side() {
  let currTime = new Date();
  let lastTime = ServerInfo.findOne({name: 'lastUpdateTime'}).value;
  let deltaTime = currTime - lastTime;
  
  console.log('****************');
  console.log('Начался тик: ' + currTime);
  console.log('Прошлый тик: ' + lastTime);
  console.log('Дельта времени: ' + deltaTime)


  // Увеличим во всех домах кол-во людей, если их максимум, выселим всех
  Buildings.find({structureKey: 'house_03'}).forEach(function(house) {
    if (house.people.curr == house.people.max) {
      // Выселим всех
      People.remove({house: house._id});
    } else {
      // Найдем жителю работу 
      let workId = Buildings.findOne({
        structureKey: 'factory', 
        'people.curr': { $lt: 10 }
      });
      People.insert({
        house: house._id,
        name: faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"),
        work: workId ? workId._id : null
      });
    }
  });


  ServerInfo.upsert({name: 'lastUpdateTime'}, {name: 'lastUpdateTime', value: currTime});
  Meteor.setTimeout(side, 1000);
}

export { startSide };