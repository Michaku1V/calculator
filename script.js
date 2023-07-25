'use strict'

// SELECTORS 
const numberBtns = document.querySelectorAll('button[data-number]')
const operatorBtns = document.querySelectorAll('button[data-operator]')
const calculateBtn = document.querySelector('button[data-calculate]')
const percentBtn = document.querySelector('button[data-percent]')
const switchBtn = document.querySelector('button[data-switch-sign]')
const deleteBtn = document.querySelector('button[data-delete]')
const clearBtn = document.querySelector('button[data-clear]')
const displayEl = document.querySelector('div[data-display]')

// INIT 
let previousNum = '';
let currentNum = '';
let operator;

// FUNCTIONS 
function add(num1, num2) {
    return num1 + num2;       
};

function subtract(num1, num2) {
    return num1 - num2;       
};

function multiply(num1, num2) {
    return num1 * num2;       
};

function divide(num1, num2) {
    if (num2===0) {
        alert('Can\'t divide by 0');
        clear();
        return
    } 
    return num1 / num2;       
};

function percentOf100() {
     currentNum = +(+currentNum/100).toFixed(5);
     display()
}

function switchSign() {
     currentNum = -currentNum;
     display()
}

function operate(a = previousNum, fun = operator, b = currentNum) {
    // Converting to number
    a=+a;
    b=+b;
    // Choosing the right function to run
    switch (fun) {
        case 'add': currentNum = +add(a, b).toFixed(5)
            break;
        case 'subtract': currentNum = +subtract(a, b).toFixed(5)
            break;
        case 'multiply': currentNum = +multiply(a, b).toFixed(5)
            break;
        case 'divide': currentNum = +divide(a, b).toFixed(5)
            break;
        default:
            return
    }
}

function clear() {
    previousNum = '';
    currentNum = '';
    operator = undefined;
    operatorBtns.forEach(btn => btn.classList.remove('active'))
    displayEl.textContent = '0';
}

function deleteNum() {
    currentNum = currentNum.toString().slice(0, -1);
    display();
}

function appendNum(number) {
    if (number === '.' && currentNum.includes('.')) return;
    if (currentNum.length >= 10) return
    currentNum = currentNum.toString() + number.toString()
}

function chooseOperator(operatorBtn) {
    if (currentNum === '') return;
    if (previousNum) {
        operate();
        display()
    }
    operator = operatorBtn;
    previousNum = currentNum;
    currentNum = '';
}

function display() {
    displayEl.textContent = currentNum 
}

// EVENTS
// Click

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        operatorBtns.forEach(btn => btn.classList.remove('active'))
        appendNum(btn.textContent);
        display()     
        // console.log(currentNum, operator, previousNum)
    })
})

operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentNum) btn.classList.toggle('active')
       chooseOperator(btn.dataset.operator); 
    })
})


calculateBtn.addEventListener('click', () => {
    operate();
    display();
    operator = ''
})

percentBtn.addEventListener('click', percentOf100)
switchBtn.addEventListener('click', switchSign)
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteNum)


// Keyboard


window.addEventListener('keydown', function (e) {
    numberBtns.forEach(btn => {
        if(e.key === btn.textContent) {
            operatorBtns.forEach(btn => btn.classList.remove('active'))
            appendNum(btn.textContent);
            display()     
        }
    })
    
    operatorBtns.forEach(btn => {
        if(e.key === btn.dataset.keyboard) {
            if (currentNum) btn.classList.toggle('active')
            chooseOperator(btn.dataset.operator); 
        }
    })
    if(e.key === 'Enter' || e.key ==='=') {operate(); display(); operator=''}
    if(e.key === 'Backspace') deleteNum();
    if(e.key === 'Escape') clear();

})