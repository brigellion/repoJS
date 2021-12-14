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
        this.addTitle();
        startBtn.addEventListener('click', this.start.bind(this));
        plusBtn.addEventListener('click', this.addScreenBlock.bind(this));
        typeRange.addEventListener('input', this.showValueRange.bind(this));
        buttonReset.addEventListener('click', this.reset.bind(this));
    },
    showResult: function () {
        total.value = this.screenPrice;
        totalCount.value = this.totalScreensCount;
        totalCountOther.value = this.servicePricesNumber + this.servicePricesPercent;
        totalFullCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
    },
    resetResult: function () {
        total.value = 0;
        totalCount.value = 0;
        totalCountOther.value = 0;
        totalFullCount.value = 0;
        totalCountRollback.value = 0;
    },
    showValueRange: function () {
        if (!this.flag) {
            span.textContent = typeRange.value + '%';
            this.rollback = typeRange.value;
        } else {
            span.textContent = typeRange.value + '%';
            this.rollback = typeRange.value;
            this.servicePercentPrice = Math.round(this.fullPrice - (this.fullPrice * (this.rollback / 100)));
            totalCountRollback.value = this.servicePercentPrice;
        }
    },
    reset: function () {
        this.flag = false;
        screens = document.querySelectorAll('.screen');
        const allInputTypeText = document.querySelector('.main-controls').querySelectorAll('input[type=text]'),
            elementsSelect = document.querySelector('.main-controls').querySelectorAll('select');
        allInputTypeText.forEach((item) => {
            item.disabled = false;
        });
        elementsSelect.forEach((item) => {
            item.disabled = false;
        });
        screens.forEach((screen, index) => {
            if (index !== 0) {
                screen.remove();
            }
        });
        document.querySelector('.screen').querySelector('select').selectedIndex = 0;
        document.querySelector('.screen').querySelector('input').value = '';
        screens = document.querySelectorAll('.screen');

        this.clearServices();
        this.resetResult();

        elementsSelect.disabled = false;
        startBtn.style.display = 'block';
        buttonReset.style.display = 'none';

        //this.init();
    },
    start: function () {
        this.screens = [];
        this.addScreens();
        let found = this.screens.some((screen) => {
            return screen.price === 0;
        });
        if (found) {
            alert('Заполните информацию об экранах!');
        } else {
            this.addServices();
            this.addPrices();
            this.showResult();
            this.flag = true;

            const allInputTypeText = document.querySelector('.main-controls').querySelectorAll('input[type=text]'),
                elementsSelect = document.querySelector('.main-controls').querySelectorAll('select');
            allInputTypeText.forEach((item) => {
                item.disabled = true;
            });
            elementsSelect.forEach((item) => {
                item.disabled = true;
            });

            elementsSelect.disabled = true;
            startBtn.style.display = 'none';
            buttonReset.style.display = 'block';
        }
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen');
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectedName = select.options[select.selectedIndex].textContent;
            this.screens.push({
                id: index,
                name: selectedName,
                price: +select.value * +input.value,
                count: +input.value
            });
        });
    },
    addServices: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }

        });

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }

        });
    },
    clearServices: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                check.checked = false;
                input.value = '';
            }
        });

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                check.checked = false;
                input.value = '';
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
        this.screenPrice = this.screens.reduce((sum, current) => {
            return sum + Number(current.price);
        }, 0);

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }
        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }
        this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
        this.servicePercentPrice = Math.round(this.fullPrice - (this.fullPrice * (this.rollback / 100)));

        this.totalScreensCount = this.screens.reduce((sum, current) => {
            return sum + Number(current.count);
        }, 0);
    },
    showTypeOf: function (variable) {
        console.log(variable, typeof variable);
    },
    getArray: function (str) {
        return str.split(', ');
    }
};

appData.init();



