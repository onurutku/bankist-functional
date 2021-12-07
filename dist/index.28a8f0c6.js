"use strict";let minute=1,sec=0;const account1={owner:"Onur Utku Topaloglu",movements:[200,450,-400,3e3,-650,-130,70,1300],interestRate:1.2,pin:1111},account2={owner:"Jessica Davis",movements:[5e3,3400,-150,-790,-3210,-1e3,8500,-30],interestRate:1.5,pin:2222},account3={owner:"Steven Thomas Williams",movements:[200,-200,340,-300,-20,50,400,-460],interestRate:.7,pin:3333},account4={owner:"Sarah Smith",movements:[430,1e3,700,50,90],interestRate:1,pin:4444},account5={owner:"Onur Utku",movements:[430,1e3,700,50,90],interestRate:1,pin:5555},accounts=[account1,account2,account3,account4,account5],labelWelcome=document.querySelector(".welcome"),labelDate=document.querySelector(".date"),labelBalance=document.querySelector(".balance__value"),labelSumIn=document.querySelector(".summary__value--in"),labelSumOut=document.querySelector(".summary__value--out"),labelSumInterest=document.querySelector(".summary__value--interest"),labelTimer=document.querySelector(".timer"),containerApp=document.querySelector(".app"),containerrApp=document.getElementById("app"),containerMovements=document.querySelector(".movements"),btnLogin=document.querySelector(".login__btn"),btnTransfer=document.querySelector(".form__btn--transfer"),formTransfer=document.querySelector(".form--transfer"),btnLoan=document.querySelector(".form__btn--loan"),btnClose=document.querySelector(".form__btn--close"),btnSort=document.querySelector(".btn--sort"),inputLoginUsername=document.querySelector(".login__input--user"),inputLoginPin=document.querySelector(".login__input--pin"),inputTransferTo=document.querySelector(".form__input--to"),inputTransferAmount=document.querySelector(".form__input--amount"),inputLoanAmount=document.querySelector(".form__input--loan-amount"),inputCloseUsername=document.querySelector(".form__input--user"),inputClosePin=document.querySelector(".form__input--pin"),currencies=new Map([["USD","United States dollar"],["EUR","Euro"],["GBP","Pound sterling"]]),movements1=[200,450,-400,3e3,-650,-130,70,1300];let currentAccount;function checkLogin(e){currentAccount="",accounts.forEach((e=>{e.username===inputLoginUsername.value&&e.pin===Number(inputLoginPin.value)&&(currentAccount=e,containerrApp.style.opacity="1")})),displayMovements(currentAccount.movements),calcDisplayBalance(currentAccount.movements),calcDisplaySummary(currentAccount.movements,currentAccount.interestRate),welcomeMessage(currentAccount),myLoop(),inputLoginUsername.value="",inputLoginPin.value="",e.preventDefault()}btnLogin.addEventListener("click",checkLogin);const displayMovements=function(e){containerMovements.innerHTML="",e.forEach(((e,n)=>{let t;t=e>0?"deposit":"withdrawal";const o=`\n      <div class="movements__row">\n        <div class="movements__type movements__type--${t}">${n+1} ${t}</div>\n        <div class="movements__date">3 days ago</div>\n        <div class="movements__value">${e}€</div>\n      </div>\n      `;containerMovements.insertAdjacentHTML("afterbegin",o)}))};accounts.forEach((function(e){let n="";e.owner.split(" ").forEach((e=>{n+=e.slice(0,1).toLowerCase()})),e.username=n}));const calcDisplayBalance=function(e){labelBalance.textContent=e.reduce((function(e,n){return e+n}),0)+" €"},calcDisplaySummary=function(e,n){const t=e.filter((function(e){return e>0})).reduce((function(e,n){return e+n}),0);labelSumIn.textContent=t+"€";const o=e.filter((function(e){return e<0})).reduce((function(e,n){return e+n}));labelSumOut.textContent=o+"€";const r=e.filter((function(e){return e>0})).map((function(e){return e*n/100})).filter((function(e,n,t){return e>=1})).reduce((function(e,n){return e+n}),0);labelSumInterest.textContent=r+"€"},welcomeMessage=function(e){labelWelcome.textContent=`Hello ${e.owner}`};btnTransfer.addEventListener("click",(function(e){e.preventDefault();const n=inputTransferTo.value,t=Number(inputTransferAmount.value),o=accounts.find((function(e){return e.username===n}));o.username!==currentAccount.username&&t>0&&(o.movements.push(t),currentAccount.movements.push(-t)),inputTransferTo.value="",inputTransferAmount.value=""})),btnLoan.addEventListener("click",(function(e){e.preventDefault();const n=Number(inputLoanAmount.value);n>0&&currentAccount.movements.some((function(e){return e>.1*n}))&&currentAccount.movements.push(n),inputLoanAmount.value=""})),btnClose.addEventListener("click",(function(e){if(e.preventDefault(),currentAccount.username===inputCloseUsername.value&&currentAccount.pin===Number(inputClosePin.value)){const e=accounts.indexOf(currentAccount);accounts.splice(e,1),containerrApp.style.opacity="0",inputCloseUsername.value="",inputClosePin.value=""}else alert('Wrong "Username" or "Password" Check them all!')}));let counter="";function myLoop(){setTimeout((function(){labelTimer.textContent=`${minute}:${sec}`,sec--,sec>=0?myLoop():minute>0?(sec=59,minute--,myLoop()):(currentAccount="",containerrApp.style.opacity="0")}),1e3)}function reset(){minute=5,sec=0}btnSort.addEventListener("click",(function(e){e.preventDefault(),"sl"===counter||""===counter?(currentAccount.movements.sort((function(e,n){return e>n?1:n>e?-1:void 0})),counter="ls"):"ls"===counter&&(currentAccount.movements.sort((function(e,n){return e>n?-1:n>e?1:void 0})),counter="sl"),displayMovements(currentAccount.movements)})),labelDate.textContent=(new Date).getUTCDay()+"/"+(new Date).getMonth()+"/"+(new Date).getFullYear(),document.body.addEventListener("click",reset),document.addEventListener("scroll",reset),document.querySelector(".movements").addEventListener("scroll",reset);
//# sourceMappingURL=index.28a8f0c6.js.map
