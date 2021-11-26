let screens = 'Простые, Сложные, Интерактивные',
    screenPrice = 200,
    rollback = 30,
    fullPrice = 5000,
    title = 'Project',
    adaptive = false;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log('Стоимость верстки экранов ' + screenPrice + ' рублей');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей');

screens = screens.toLowerCase();
console.log(screens.split(', '));

console.log(fullPrice * (rollback / 100));