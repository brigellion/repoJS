'use strict';

let screens = 'Простые, Сложные, Интерактивные',
    screenPrice = 1000,
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

title = prompt('Как называется ваш проект?');
screens = prompt('Какие типы экранов нужно разработать?');
adaptive = !!prompt('Нужен ли адаптив на сайте?');

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой еще дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Скольqweко это будет стоить?');

fullPrice = screenPrice + servicePrice1 + servicePrice2;

let servicePercentPrice = Math.round(fullPrice - (fullPrice * (rollback / 100)));
console.log(servicePercentPrice);

switch (true) {
    case fullPrice >= 30000:
        console.log('Даем скидку в 10%');
        break;
    case fullPrice >= 15000 && fullPrice < 30000:
        console.log('Даем скидку в 5%');
        break;
    case fullPrice < 15000 && fullPrice >= 0:
        console.log('Скидка не предусмотрена');
        break;
    default:
        console.log('Что-то пошло не так');
}
