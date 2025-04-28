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
    console.log(`Свойство ${prop} изменено на ${value}`);
    target[prop] = value;
    return true;
  }
});

console.log(proxUzer.name); // в консоли: доступ к свойству..
proxUzer.age = 26;          // в консоли: ...изменено на 26
console.log(proxUzer.age); 
