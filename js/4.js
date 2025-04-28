// функция-имитация загрузки текстуры
const loadTexture = (textureName) => {
  console.log(`Загрузка текстуры: ${textureName}...`);
  return `Текстура ${textureName} загружена`;
};

// прокси для кеширования
const createCacheProxy = (func) => {
  const cache = {}; //сам кэш
  return new Proxy(func, {
    apply(target, thisArg, args) {
      let arg = args[0];  
      // проверка результата для аргумента в кэше
      if (arg in cache) {
        console.log('Из кэша =>', cache[arg]);
        return cache[arg];
      }
      // если результата нет в кэше, вызываем функцию и сохраняем результат
      let result = target.apply(thisArg, args);
      cache[arg] = result;
      return result;
    }
  });
};

const cachedLoadTexture = createCacheProxy(loadTexture);
console.log(cachedLoadTexture('wood'));   
console.log(cachedLoadTexture('wood'));   
console.log(cachedLoadTexture('stone'));  
console.log(cachedLoadTexture('stone'));
