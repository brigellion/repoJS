'use strict';

const title = document.getElementsByTagName('h1')[0],
    buttonStart = document.getElementsByClassName('handler_btn')[0],
    buttonReset = document.getElementsByClassName('handler_btn')[1],
    screenButton = document.querySelector('.screen-btn'),
    percentItems = document.querySelectorAll('.other-items.percent'),
    numberItems = document.querySelectorAll('.other-items.number'),
    typeRange = document.querySelector(".rollback input[type=range]"),
    span = document.querySelector(".rollback span.range-value"),

    total = document.getElementsByClassName('total-input')[0],
    totalCount = document.getElementsByClassName('total-input')[1],
    totalCountOther = document.getElementsByClassName('total-input')[2],
    totalFullCount = document.getElementsByClassName('total-input')[3],
    totalCountRollback = document.getElementsByClassName('total-input')[4];
let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 30,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},
    init: function () {
        appData.addTitle();
        appData.start();
    },
    addTitle: function () {
        console.log(title);
    },
    asking: function () {
        do {
            appData.title = prompt('Как называется ваш проект?');
        }
        while (appData.isNumber(appData.title) || appData.title === null);


        appData.adaptive = confirm('Нужен ли адаптив на сайте?');

        for (let i = 0; i < 2; i++) {
            let name;
            do {
                name = prompt('Какие типы экранов нужно разработать?');
            }
            while (appData.isNumber(name) || name === null);

            let price = 0;

            do {
                price = prompt('Сколько будет стоить данная работа?');
            }
            while (!appData.isNumber(price));

            appData.screens.push({ id: i, name: name, price: price });

        }

        for (let i = 0; i < 2; i++) {
            let name;
            do {
                name = prompt('Какой дополнительный тип услуги нужен?');
            }
            while (appData.isNumber(name) || name === null);
            let price = 0;
            do {
                price = prompt('Сколько это будет стоить?');
            }
            while (!appData.isNumber(price));
            appData.services[name + [i]] = +price;
        }
    },
    addPrices: function () {
        appData.screenPrice = appData.screens.reduce(function (sum, current) {
            return sum + Number(current.price);
        }, 0);

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    isNumber: function (num) {
        if (num) {
            num = num.trim();
            return !isNaN(parseFloat(num)) && isFinite(num);
        } else {
            return false;
        }
    },
    showTypeOf: function (variable) {
        console.log(variable, typeof variable);
    },
    getRollbackMessage: function (price) {
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
    },
    getFullPrice: function (priceForScreen, allPrice) {
        appData.fullPrice = Number(priceForScreen) + allPrice;
    },
    getServicePercentPrice: function (price, roll) {
        appData.servicePercentPrice = Math.round(price - (price * (roll / 100)));
    },
    getTitle: function (chars) {
        chars = chars.trim();
        chars = chars.toLowerCase();
        appData.title = chars[0].toUpperCase() + chars.substring(1);
    },
    getArray: function (str) {
        return str.split(', ');
    },
    start: function () {
        /*appData.asking();
        appData.addPrices();
        appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
        appData.getServicePercentPrice(appData.fullPrice, appData.rollback);
        appData.getTitle(appData.title);
        this.logger();*/
    },
    logger: function () {
        console.log('AllServicePrices: ', appData.allServicePrices);
        console.log('FullPrice: ', appData.fullPrice);
        console.log('ServicePercentPrice: ', appData.servicePercentPrice);
        console.log('Screens: ', appData.screens);
        console.log('Services: ', appData.services);
        console.log('ScreenPrice: ', appData.screenPrice);
    }
};



const elementsLog = function () {
    console.log('----1 пункт----');
    console.log(title);
    console.log('----2 пункт----');
    console.log(buttonStart);
    console.log(buttonReset);
    console.log('----3 пункт----');
    console.log(screenButton);
    console.log('----4 пункт----');
    console.log(percentItems);
    console.log(numberItems);
    console.log('----5 пункт----');
    console.log(typeRange);
    console.log('----6 пункт----');
    console.log(span);
    console.log('----7 пункт----');
    console.log(total);
    console.log(totalCount);
    console.log(totalCountOther);
    console.log(totalFullCount);
    console.log(totalCountRollback);
    console.log('----8 пункт----');
    console.log(screens);
};
appData.init();



