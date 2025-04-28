const user = {
  name: "Алексей",
  age: 25
};
const proxUzer = new Proxy(user, {
  get(target, prop) {
    console.log(`Доступ к свойству ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    if (prop === 'age') {
      if (typeof value !== 'number') { //валидация по типу
        throw new Error('Возраст пользователя может быть задан только числом');
      }
    }
    if (prop === 'name') {
      if (typeof value !== 'string' || value.length < 3) {
        throw new Error('Имя должно состоять минимум 3 символов');
      }
    }
    console.log(`Свойство ${prop} изменено на ${value}`);
    target[prop] = value;
    return true;
  }
});

console.log(proxUzer.name);
proxUzer.age = 30;         
proxUzer.name = "Иван"; 
// приведет к ошибкам
// proxUzer.age = "тридцать";// age не число
// proxUzer.name = "Ал"; // имя короче 3