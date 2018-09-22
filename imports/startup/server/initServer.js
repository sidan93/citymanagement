import { Params } from '/imports/startup/both/params'

function init() {
  // Проинициализируем версию сервера
  let lastVersion = Params.get(Params.version);
  if (lastVersion !== Params.CURR_VERSION) {
    converScript(lastVersion);
    Params.set(Params.version, Params.CURR_VERSION);
  }

  // Проинициализируем первый время последнего обновления
  let lastTime = Params.get(Params.lastUpdateTime);
  if (!lastTime)
    Params.set(Para.lastUpdateTime, new Date());
}

function converScript(oldVer) {
  console.log(`Конвертация с версии ${oldVer} до версии ${Params.CURR_VERSION}`)
}

export { init };