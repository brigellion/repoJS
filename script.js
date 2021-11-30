'use strict';

let rollback = 30,
    title = prompt('Как называется ваш проект?'),
    screens = prompt('Какие типы экранов нужно разработать?'),
    screenPrice = prompt('Сколько будет стоить данная работа?'),
    adaptive = !!prompt('Нужен ли адаптив на сайте?'),
    service1 = prompt('Какой дополнительный тип услуги нужен?'),
    servicePrice1 = +prompt('Сколько это будет стоить?'),
    service2 = prompt('Какой еще дополнительный тип услуги нужен?'),
    servicePrice2 = +prompt('Сколько это будет стоить?'),
    allServicePrices,
    servicePercentPrice,
    fullPrice;

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
    switch (true) {
        case price >= 30000:
            return 'Даем скидку в 10%';
        case price >= 15000 && price < 30000:
            return 'Даем скидку в 5%';
        case price < 15000 && price >= 0:
            return 'Скидка не предусмотрена';
        default:
            return 'Что-то пошло не так';
    }
};

const getAllServicePrices = function (servicePrice1, servicePrice2) {
    return Number(servicePrice1) + servicePrice2;
};

function getFullPrice(priceForScreen, allPrice) {
    return Number(priceForScreen) + allPrice;
}

const getServicePercentPrice = function (price, roll) {
    return Math.round(price - (price * (roll / 100)));
};

const getTitle = function (chars) {
    chars = chars.trim();
    chars = chars.toLowerCase();
    return chars[0].toUpperCase() + chars.substring(1);
};

const getArray = function (str) {
    return str.split(', ');
};

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);


showTypeOf(getTitle(title));
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrice(fullPrice, rollback));
