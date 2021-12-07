'use strict';

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
        appData.asking();
        appData.addPrices();
        appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
        appData.getServicePercentPrice(appData.fullPrice, appData.rollback);
        appData.getTitle(appData.title);
        this.logger();
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

appData.start();

