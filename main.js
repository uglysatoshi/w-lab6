// Определение полей/кнопок к константам
const result = document.querySelector('.output-row'),
    expression = document.querySelector('.input-row'),
    num = document.querySelectorAll('.number-btn'),
    operation = document.querySelectorAll('.operator-btn:not(#deletion)'),
    equals = document.querySelector('.equals-btn'),
    clear = document.querySelector('.clear-btn'),
    deletion = document.querySelector('#deletion');

let ex = '';
result.innerHTML = ':)';

// Событие при нажатии на цифру
function onClickNumber() {
    if(!ex || typeof(ex) === 'number' || ex === '0') {
        expression.innerHTML = this.id;
        ex = this.id;
    } else {
        expression.innerHTML += this.id;
        ex += this.id;
    }
    checkLengthOfExpression(expression.innerHTML);
}

// Событие при нажатии на оператор
function onClickOperator() {
    if(!ex) {
        return;
    }
    ex = ex.toString().replace(/=/, '');
    if (ex.match(/\/|\*|\+|-|=/)) {
        ex = eval(ex).toString();
    }
    expression.innerHTML = expression.innerHTML.replace(/=/, '') + this.id;
    ex += this.id;
}

// Добавление соответствующей функции цифрам
Array.from(num).forEach(function(element) {
    element.addEventListener('click', onClickNumber);
});

// Добавление соответствующей функции операторам
Array.from(operation).forEach(function(element) {
    element.addEventListener('click', onClickOperator);
});

// Очистка полей результата и выражения
clear.addEventListener('click', () => {
    result.innerHTML = ':)';
    expression.innerHTML = '';
    ex = '';
})

// Удаление последнего символа выражения
deletion.addEventListener('click', () => {
    if (!expression.innerHTML.match(/=$/)) {

        expression.innerHTML = doDeletion(expression.innerHTML);
        ex = doDeletion(ex);

        function doDeletion(arg) {
            arg = arg.split("", -1);
            arg.splice(-1, 1);
            return arg.join('');
        }
    }
})

// Проведение расчетов
equals.addEventListener('click', ()=> {
    if (!ex) {
        result.innerHTML = '0';
    } else {
        ex = eval(ex);
        expression.innerHTML += '=';
        result.innerHTML = trimResult(ex);
    }
})

// Проверка на длинну выражения
function checkLengthOfExpression(arg) {
    if (arg.toString().length > 8) {
        expression.innerHTML = 'error!'.toUpperCase();
        result.innerHTML = ':)';
        ex = '0';
    }
}

// Проверка на длинну результата
function trimResult(arg) {
    if (arg.toString().length > 14) {
        ex = parseFloat(arg.toPrecision(7));
        if (ex.toString().length > 14) {
            ex = ex.toExponential(9);
        }
        return ex;
    } else {
        return arg;
    }
}
