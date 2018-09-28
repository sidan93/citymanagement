import '/imports/both'
import { Meteor } from 'meteor/meteor'
import * as faker from 'faker'
import { House } from '../both/gameObject/house'
import { Factory } from '../both/gameObject/factory'
import { Region } from '../both/region'
import { Params } from '/imports/both/params'


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


  // Увеличим кол-во людей в каждом регионе
  Regions.find().forEach(function (region) {
    if (region.income.last && currTime - region.income.last < region.income.interval * 1000) 
      return;

    // Если пришло времо пополнения
    let regionObject = new Region(null, region);
    let currAttractiveness = regionObject.getAttractiveness();

    // TODO сделать как нибудь нормально
    let countPeople = 0;
    for (let i = 0; i < region.income.mapPeople; i++)
      if (Math.random() * 100 < currAttractiveness)
        countPeople++;

    console.log(`Приезжает ${countPeople} жителей`);
    for (let i = 0; i < countPeople; i++) {
      // Найдем жителю работу 
      let work = Buildings.findOne({
        structureKey: Factory.key, 
        'people.curr': { $lt: Factory.maxPeople }
      });
      // Найдем жителю дом
      let house = Buildings.findOne({
        structureKey: House.key,
        'people.curr': { $lt: House.maxPeople }
      });

      People.insert({
        house: house ? house._id : null,
        work: work ? work._id : null
      });

    }
    Regions.upsert({_id: region._id}, { $set: { 'income.last': currTime }});
  });

  // // Увеличим во всех домах кол-во людей, если их максимум, выселим всех
  // Buildings.find({structureKey: House.key}).forEach(function(house) {
  //   if (house.people.curr == house.people.max) {
  //     // Выселим всех
  //     People.remove({house: house._id});
  //   } else {
  //     // Найдем жителю работу 
  //     let workId = Buildings.findOne({
  //       structureKey: Factory.key, 
  //       'people.curr': { $lt: 10 }
  //     });
  //     People.insert({
  //       house: house._id,
  //       name: faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"),
  //       work: workId ? workId._id : null
  //     });
  //   }
  // });

  Params.set(Params.lastUpdateTime, currTime);
  Meteor.setTimeout(side, 1000);
}

export { startSide };