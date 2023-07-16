const lengthDisplay = document.getElementById('PaswrdLen');
const slider = document.getElementById('Slider');
const displayPass = document.getElementById('displayPassword');
let checkCount = 0;
let PasswordLength = 10;
let password = "";
function handleSlider() {
    slider.value = PasswordLength;
    lengthDisplay.innerText = PasswordLength;
}
handleSlider();
slider.oninput = function () {
    PasswordLength = slider.value;
    handleSlider();
}
const strenthIndic = document.getElementById('indicator');
const UpperCase = document.getElementById('upper');
const LowerCase = document.getElementById('lower');
const number = document.getElementById('number');
const symbol = document.getElementById('symbols');
//set color of strength indicator
function setColor(color) {
    strenthIndic.style.background = color;
    strenthIndic.style.boxShadow =`0px 0px 10px ${color}`;
}
function checkStrength() {
    let UpperCheck = false;
    let LowerCheck = false;
    let NumberCheck = false;
    let SymbolCheck = false;
    if (UpperCase.checked) UpperCheck = true;
    if (LowerCase.checked) LowerCheck = true;
    if (number.checked) NumberCheck = true;
    if (symbol.checked) SymbolCheck = true;
    //conditions for strendth
    if (UpperCheck && LowerCheck && (NumberCheck || SymbolCheck) && PasswordLength >= 8) {
        setColor('#0f0');
    }
    else if ((UpperCheck&&LowerCheck)||
            ((UpperCheck||LowerCheck)&&NumberCheck)||
            ((UpperCheck||NumberCheck)&&SymbolCheck)) {
        setColor('yellow');
    }
    else {
        setColor('#f00');
    }
}
const Generate = document.getElementById('GenerateButton');
let checkboxes = document.querySelectorAll("input[type=checkbox]");
function changeCheck(){
    checkCount =0;
    checkboxes.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++;
    })
    //special case
    if(PasswordLength<checkCount){
        PasswordLength = checkCount;
        handleSlider();
    }
}
function RandomInt(min,max){
    return Math.floor((Math.random()*(max-min))+min);
}
function RandomNum(){
    return RandomInt(0,9);
}
function RandomUpper(){
    return String.fromCharCode(RandomInt(65,90));
}
function RandomLower(){
    return String.fromCharCode(RandomInt(97,122));
}
const symbols = '!@#$%^&*()_+-{}|[]\:";<>?,./';
function RandomSymbol(){
    return symbols.charAt(RandomInt(0,symbols.length));
}
function getPassword(){
    let arr = [];
    password = "";
    if(UpperCase.checked) arr.push(RandomUpper);
    if(LowerCase.checked) arr.push(RandomLower);
    if(number.checked) arr.push(RandomNum);
    if(symbol.checked) arr.push(RandomSymbol);
    //important requirement
    for(let i=0; i<arr.length; i++){
        password+=arr[i]();
    }
    for(let i=0; i<PasswordLength-arr.length; i++){
        let randomValue = RandomInt(0,arr.length);
        password+=arr[randomValue]();
    }
    if(PasswordLength<checkCount){
        PasswordLength = checkCount;
    }
    handleSlider();
    displayPass.value = shuffle(Array.from(password));
    checkStrength();
}
function shuffle(password){
    for(let i=password.length-1; i>0; i--){
        let j= Math.floor(Math.random()*(i+1));
        let temp = password[i];
        password[i]=password[j];
        password[j]=temp;
    }
    let str = "";
    password.forEach((e)=>{str+=e;});
    return str;
}
const copyBtn = document.getElementById('copy_btn');
const copyText = document.getElementById('copy_text');
async function handleCopy(){
    if(displayPass.value==""){
        return ;
    }
    try{
       await navigator.clipboard.writeText(displayPass.value);
       copyText.innerText = 'copied';
    }
    catch(e){
        copyText.innerText = 'failed';
    } 
    copyText.style.visibility='visible';
    setTimeout(() => {
        copyText.style.visibility='hidden';
    },2000)   
}

