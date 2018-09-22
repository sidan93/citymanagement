import { Meteor } from 'meteor/meteor'
import '/imports/startup/both';

function startSide() {
  let lastTime = ServerInfo.findOne({name: 'lastUpdateTime'});
  if (!lastTime)
    ServerInfo.insert({
      name: 'lastUpdateTime',
      value: new Date(0)
    })
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
  Buildings.find({structureKey: 'house_03'}).fetch().forEach(function(house) {
    house.people.curr += 1;
    if (house.people.curr > house.people.max)
      house.people.curr = 0;
    Buildings.upsert({_id: house._id}, house);
  });


  ServerInfo.upsert({name: 'lastUpdateTime'}, {name: 'lastUpdateTime', value: currTime});
  Meteor.setTimeout(side, 1000);
}

export { startSide };