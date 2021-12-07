'use strict';
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
let minute = 1;
let sec = 0;
// Data
const account1 = {
    owner: 'Onur Utku Topaloglu',
    movements: [
        200,
        450,
        -400,
        3000,
        -650,
        -130,
        70,
        1300
    ],
    interestRate: 1.2,
    pin: 1111
};
const account2 = {
    owner: 'Jessica Davis',
    movements: [
        5000,
        3400,
        -150,
        -790,
        -3210,
        -1000,
        8500,
        -30
    ],
    interestRate: 1.5,
    pin: 2222
};
const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [
        200,
        -200,
        340,
        -300,
        -20,
        50,
        400,
        -460
    ],
    interestRate: 0.7,
    pin: 3333
};
const account4 = {
    owner: 'Sarah Smith',
    movements: [
        430,
        1000,
        700,
        50,
        90
    ],
    interestRate: 1,
    pin: 4444
};
const account5 = {
    owner: 'Onur Utku',
    movements: [
        430,
        1000,
        700,
        50,
        90
    ],
    interestRate: 1,
    pin: 5555
};
const accounts = [
    account1,
    account2,
    account3,
    account4,
    account5
];
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerrApp = document.getElementById('app');
const containerMovements = document.querySelector('.movements');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const formTransfer = document.querySelector('.form--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const currencies = new Map([
    [
        'USD',
        'United States dollar'
    ],
    [
        'EUR',
        'Euro'
    ],
    [
        'GBP',
        'Pound sterling'
    ], 
]);
const movements1 = [
    200,
    450,
    -400,
    3000,
    -650,
    -130,
    70,
    1300
];
/////////////////////////////////////////////////
//---------------------------LOGIN-----------------------------------
let currentAccount;
function checkLogin(e) {
    currentAccount = '';
    accounts.forEach((account)=>{
        if (account.username === inputLoginUsername.value && account.pin === Number(inputLoginPin.value)) {
            currentAccount = account;
            containerrApp.style.opacity = '1';
        }
    });
    //Movement Display
    displayMovements(currentAccount.movements);
    //Calculate Balance
    calcDisplayBalance(currentAccount.movements);
    //Calculate the summary
    calcDisplaySummary(currentAccount.movements, currentAccount.interestRate);
    //Display Welcome Message
    welcomeMessage(currentAccount);
    //Start Timer
    myLoop();
    //Clear inputs for next Login
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    e.preventDefault();
}
btnLogin.addEventListener('click', checkLogin);
//---------------------------LOGIN------------------------------------
//-------------------------MOVEMENTS-----------------------------------
const displayMovements = function(movements) {
    containerMovements.innerHTML = '';
    movements.forEach((mov, i)=>{
        let type;
        if (mov > 0) type = 'deposit';
        else type = 'withdrawal';
        const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}€</div>
      </div>
      `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};
//-------------------------MOVEMENTS------------------------------------
//-------------------------USERNAME ADDING-------------------------------
(function() {
    accounts.forEach(function(account) {
        let result = '';
        account.owner.split(' ').forEach((fullName)=>{
            result += fullName.slice(0, 1).toLowerCase();
        });
        account.username = result;
    });
})();
//-------------------------USERNAME ADDING-------------------------------
//-------------------------CALCULATE BALANCE-----------------------------
const calcDisplayBalance = function(movements) {
    labelBalance.textContent = movements.reduce(function(acc, current) {
        return acc + current;
    }, 0) + ` €`;
};
//-------------------------CALCULATE BALANCE-----------------------------
//------------------------CALCULATING SUMMARY--------------------------
const calcDisplaySummary = function(movements, rate) {
    const posIncomes = movements.filter(function(mov) {
        return mov > 0;
    }).reduce(function(acc, total) {
        return acc + total;
    }, 0);
    labelSumIn.textContent = posIncomes + `€`;
    const negIncomes = movements.filter(function(mov) {
        return mov < 0;
    }).reduce(function(acc, total) {
        return acc + total;
    });
    labelSumOut.textContent = negIncomes + `€`;
    const interest = movements.filter(function(mov) {
        return mov > 0;
    }).map(function(deposit) {
        return deposit * rate / 100;
    }).filter(function(int, i, arr) {
        return int >= 1;
    }).reduce(function(total, current) {
        return total + current;
    }, 0);
    labelSumInterest.textContent = interest + `€`;
};
//------------------------CALCULATING SUMMARY--------------------------
//--------------------------WELCOME MESSAGE----------------------------
const welcomeMessage = function(account) {
    labelWelcome.textContent = `Hello ${account.owner}`;
};
//--------------------------WELCOME MESSAGE-----------------------------
//--------------------------TRANSFER OPERATION---------------------------
btnTransfer.addEventListener('click', function(e) {
    e.preventDefault();
    //-------------------------1.Yöntem Find-------------------------------
    const transferTo = inputTransferTo.value;
    const transferValue = Number(inputTransferAmount.value);
    const tr = accounts.find(function(acc) {
        return acc.username === transferTo;
    });
    if (tr.username !== currentAccount.username && transferValue > 0) {
        tr.movements.push(transferValue);
        currentAccount.movements.push(-transferValue);
    }
    //-------------------------2.Yöntem ForEach-------------------------------
    // accounts.forEach(account => {
    //   if (
    //     account.username === transferTo &&
    //     transferTo !== currentAccount.username
    //   ) {
    //     account.movements.push(transferValue);
    //     currentAccount.movements.push(-transferValue);
    //   }
    // });
    inputTransferTo.value = '';
    inputTransferAmount.value = '';
});
//--------------------------TRANSFER OPERATION---------------------------
//----------------------------REQUEST LOAN-------------------------------
btnLoan.addEventListener('click', function(e) {
    e.preventDefault();
    const requetsAmount = Number(inputLoanAmount.value);
    if (requetsAmount > 0 && currentAccount.movements.some(function(so) {
        return so > requetsAmount * 0.1;
    })) currentAccount.movements.push(requetsAmount);
    inputLoanAmount.value = '';
});
//----------------------------REQUEST LOAN-------------------------------
//----------------------------CLOSE ACCOUNT------------------------------
btnClose.addEventListener('click', function(e) {
    e.preventDefault();
    if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {
        const index = accounts.indexOf(currentAccount);
        accounts.splice(index, 1);
        containerrApp.style.opacity = '0';
        inputCloseUsername.value = '';
        inputClosePin.value = '';
    } else alert('Wrong "Username" or "Password" Check them all!');
});
//----------------------------CLOSE ACCOUNT------------------------------
//--------------------------SORTING MOVEMENTS----------------------------
let counter = '';
btnSort.addEventListener('click', function(e) {
    e.preventDefault();
    if (counter === 'sl' || counter === '') {
        currentAccount.movements.sort(function(a, b) {
            if (a > b) return 1;
            if (b > a) return -1;
        });
        counter = 'ls';
    } else if (counter === 'ls') {
        currentAccount.movements.sort(function(a, b) {
            if (a > b) return -1;
            if (b > a) return 1;
        });
        counter = 'sl';
    }
    displayMovements(currentAccount.movements);
});
//--------------------------SORTING MOVEMENTS----------------------------
//-----------------------------DATE AND TIME-----------------------------
(function() {
    labelDate.textContent = new Date().getUTCDay() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
})();
function myLoop() {
    setTimeout(function() {
        labelTimer.textContent = `${minute}:${sec}`;
        sec--;
        if (sec >= 0) myLoop();
        else if (minute > 0) {
            sec = 59;
            minute--;
            myLoop();
        } else {
            currentAccount = '';
            containerrApp.style.opacity = '0';
        }
    }, 1000);
}
function reset() {
    minute = 5;
    sec = 0;
}
document.body.addEventListener('click', reset);
document.addEventListener('scroll', reset);
document.querySelector('.movements').addEventListener('scroll', reset); //-----------------------------DATE AND TIME-----------------------------

//# sourceMappingURL=index.810bb8fa.js.map
