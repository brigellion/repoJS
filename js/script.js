'use strict';

const title = document.getElementsByTagName('h1')[0],
    startBtn = document.getElementsByClassName('handler_btn')[0],
    buttonReset = document.getElementsByClassName('handler_btn')[1],
    plusBtn = document.querySelector('.screen-btn'),
    otherItemsPercent = document.querySelectorAll('.other-items.percent'),
    otherItemsNumber = document.querySelectorAll('.other-items.number'),
    typeRange = document.querySelector(".rollback input[type=range]"),
    span = document.querySelector(".rollback span.range-value"),
    total = document.getElementsByClassName('total-input')[0],
    totalCount = document.getElementsByClassName('total-input')[1],
    totalCountOther = document.getElementsByClassName('total-input')[2],
    totalFullCount = document.getElementsByClassName('total-input')[3],
    totalCountRollback = document.getElementsByClassName('total-input')[4];
let screens = document.querySelectorAll('.screen');

const appData = {
    flag: false,
    title: '',
    screens: [],
    totalScreensCount: 0,
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        appData.addTitle();
        startBtn.addEventListener('click', appData.start);
        plusBtn.addEventListener('click', appData.addScreenBlock);
        typeRange.addEventListener('input', appData.showValueRange);
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCount.value = appData.totalScreensCount;
        totalCountOther.value = appData.servicePricesNumber + appData.servicePricesPercent;
        totalFullCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
    },
    showValueRange: function () {
        if (!appData.flag) {
            span.textContent = typeRange.value + '%';
            appData.rollback = typeRange.value;
        } else {
            span.textContent = typeRange.value + '%';
            appData.rollback = typeRange.value;
            appData.servicePercentPrice = Math.round(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
            totalCountRollback.value = appData.servicePercentPrice;
        }
        appData.flag = !appData.flag;
    },
    start: function () {
        appData.screens = [];
        appData.addScreens();
        let found = appData.screens.some(function (screen) {
            return screen.price === 0;
        });
        if (found) {
            alert('Заполните информацию об экранах!');
        } else {
            appData.addServices();
            appData.addPrices();
            appData.showResult();
            appData.flag = 1;
        }
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen');
        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectedName = select.options[select.selectedIndex].textContent;
            appData.screens.push({
                id: index,
                name: selectedName,
                price: +select.value * +input.value,
                count: +input.value
            });
        });
    },
    addServices: function () {
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }

        });

        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }

        });
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    addPrices: function () {
        appData.screenPrice = appData.screens.reduce(function (sum, current) {
            return sum + Number(current.price);
        }, 0);

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }
        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }
        appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
        appData.servicePercentPrice = Math.round(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));

        appData.totalScreensCount = appData.screens.reduce(function (sum, current) {
            return sum + Number(current.count);
        }, 0);
    },
    showTypeOf: function (variable) {
        console.log(variable, typeof variable);
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
    logger: function () {
        console.log('AllServicePrices: ', appData.allServicePrices);
        console.log('FullPrice: ', appData.fullPrice);
        console.log('ServicePercentPrice: ', appData.servicePercentPrice);
        console.log('Screens: ', appData.screens);
        console.log('Services: ', appData.services);
        console.log('ScreenPrice: ', appData.screenPrice);
    }
};

appData.init();



