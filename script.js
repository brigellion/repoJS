'use strict';

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 30,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',
    asking: function () {
        appData.title = prompt('Как называется ваш проект?');
        appData.screens = prompt('Какие типы экранов нужно разработать?');

        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?');
        }
        while (!appData.isNumber(appData.screenPrice));

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    isNumber: function (num) {
        if (num) {
            num = num.trim();
            return !isNaN(parseFloat(num)) && isFinite(num);
        } else {
            return false;
        }
    },
    getAllServicePrices: function () {
        let sum = 0,
            input;
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
            }

            do {
                input = prompt('Сколько это будет стоить?');
            }
            while (!appData.isNumber(input));
            sum += Number(input);
        }

        return sum;
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
        return Number(priceForScreen) + allPrice;
    },
    getServicePercentPrice: function (price, roll) {
        return Math.round(price - (price * (roll / 100)));
    },
    getTitle: function (chars) {
        chars = chars.trim();
        chars = chars.toLowerCase();
        return chars[0].toUpperCase() + chars.substring(1);
    },
    getArray: function (str) {
        return str.split(', ');
    },
    start: function () {
        appData.asking();

        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
        appData.servicePercentPrice = appData.getServicePercentPrice(appData.fullPrice, appData.rollback);
        appData.title = appData.getTitle(appData.title);
        this.logger();
    },
    logger: function () {
        for (let item in appData) {
            console.log("obj." + item + " = " + appData[item]);
        }
    }
};

appData.start();

