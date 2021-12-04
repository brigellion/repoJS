'use strict';

let rollback = 30,
    title,
    screens,
    screenPrice,
    adaptive,
    allServicePrices,
    servicePercentPrice,
    fullPrice,
    service1,
    service2;

const isNumber = function (num) {
    if (num) {
        num = num.trim();
        return !isNaN(parseFloat(num)) && isFinite(num);
    } else {
        return false;
    }
};

const asking = function () {
    title = prompt('Как называется ваш проект?');
    screens = prompt('Какие типы экранов нужно разработать?');

    do {
        screenPrice = prompt('Сколько будет стоить данная работа?');
    }
    while (!isNumber(screenPrice));

    adaptive = confirm('Нужен ли адаптив на сайте?');
};

const getAllServicePrices = function () {
    let sum = 0,
        input;
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?');
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?');
        }

        do {
            input = prompt('Сколько это будет стоить?');
        }
        while (!isNumber(input));
        sum += Number(input);
    }

    return sum;
};



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


asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
console.log('allServicePrices = ', allServicePrices);

showTypeOf(getTitle(title));
showTypeOf(fullPrice);
showTypeOf(adaptive);



console.log(screens);
console.log(getArray(screens));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrice(fullPrice, rollback));