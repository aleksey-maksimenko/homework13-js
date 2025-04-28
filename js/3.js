const cart = {
  items: [
    { name: "Ноутбук", price: 50000 },
    { name: "Мышь", price: 1000 }
  ],
  total: 51000
};

const proxKorz = new Proxy(cart, {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, value) {
    if (prop === 'items') {
      const oldItems = target.items;
      const newItems = value;
      // добавление или удаление
      if (newItems.length > oldItems.length) {
        const addedItem = newItems[newItems.length - 1];
        target.total += addedItem.price;
        console.log(`Добавлен товар ${addedItem.name}, новая сумма ${target.total}`);
      } else if (newItems.length < oldItems.length) {
        const removedItem = oldItems.find(item => !newItems.includes(item));
        target.total -= removedItem.price;
        console.log(`Удален товар ${removedItem.name}, новая сумма ${target.total}`);
      }
      target[prop] = value;
    } else {
      target[prop] = value;
      console.log(`Изменено свойство ${prop}`);
    }
    return true;
  }
});

proxKorz.addltem = function(item) {
  const newItems = this.items.slice();
  newItems.push(item);
  this.items = newItems;
};
proxKorz.removeltem = function(index) {
  if (index >= 0 && index < this.items.length) {
    const newItems = this.items.slice();
    newItems.splice(index, 1);
    this.items = newItems;
  } else {
    throw new Error(`Ошибка: товар с индексом ${index} не найден`);
  }
};

proxKorz.addltem({ name: "Клавиатура", price: 3000 });
proxKorz.removeltem(1);
try {
  proxKorz.removeltem(5); 
} catch (error) {
  console.log(error.message); // товар с индексом 5 не найден
}
proxKorz.addltem({ name: "Монитор", price: 15000 });
console.log("Текущий total:", proxKorz.total);