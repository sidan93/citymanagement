import { Regions } from '../both/collections';
import { Params } from '/imports/both/params';

function converScript(oldVer) {
  console.log(`Конвертация с версии ${JSON.stringify(oldVer)} до версии ${Params.CURR_VERSION}`);
}

// Проинициализируем версию сервера
let lastVersion = Params.get(Params.version);
if (lastVersion !== Params.CURR_VERSION) {
  converScript(lastVersion);
  Params.set(Params.version, Params.CURR_VERSION);
}

// Проинициализируем первый время последнего обновления
let lastTime = Params.get(Params.lastUpdateTime);
if (!lastTime)
  Params.set(Params.lastUpdateTime, new Date());

// создадим единственный регион для начала
let regions = Regions.find().fetch();
// если их нет создадим
if (!regions.length) {
  console.log('Создаем регион');
  Regions.insert({
    number: 1, 
    name: 'Основной',
    income: {
      interval: 5,
      mapPeople: 10
    }
  });
}
