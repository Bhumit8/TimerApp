var down = false;
window.addEventListener('keydown',keyCheck, false);

var down = false;
window.addEventListener('keydown', keyCheck, false);

document.addEventListener('keyup', function () {
    down = false;
}, false);


const errorDiv = document.getElementById('errorDiv');

document.getElementById('indicator1').style.visibility='hidden';
document.getElementById('indicator2').style.visibility='hidden';


// variables to store hours minutes and seconds of player 1
var hours1 = 0;
var minutes1 = 0;
var seconds1 = 0;
var milliseconds1 = 0

// variables to store hours minutes and seconds of player 2
var hours2 = 0;
var minutes2 = 0;
var seconds2 = 0;
var milliseconds2 = 0;

// selecting the timer displays
const timer1Display = document.getElementById('timer1-display');
const timer2Display = document.getElementById('timer2-display');
const timer1Milliseconds = document.getElementById('timer1-millisec');
const timer2Milliseconds = document.getElementById('timer2-millisec');

// selecting the start button
const startLeftBtn = document.getElementById('start-left');
const startRightBtn = document.getElementById('start-right');

startLeftBtn.setAttribute('disabled', 'true');
startRightBtn.setAttribute('disabled', 'true');

const setBtn = document.getElementById('set-button');

const switchBtn = document.getElementById('switch-button');

switchBtn.addEventListener('click', mouseDown);

function mouseDown(){
    switchBtn.blur();
}

const stopBtn = document.getElementById('stop-button');

// interval for timer 1 and 2
var interval1 = -1;
var interval2 = -1;

var timerEnd = false;

function keyCheck(key){
    if(down) return;
    down = true;
    if(key.keyCode == "32"){
        if(timerEnd != true){
            switchTimer();
        }
    }
}

function showIndicator1(){
    document.getElementById('indicator2').style.visibility='hidden';
    document.getElementById('indicator1').style.visibility='visible';
    timerEnd = false;
}

function showIndicator2(){
    document.getElementById('indicator1').style.visibility='hidden';
    document.getElementById('indicator2').style.visibility='visible';
    timerEnd = false;
}

function hideIndicators(){
    document.getElementById('indicator1').style.visibility='hidden';
    document.getElementById('indicator2').style.visibility='hidden';
}

function switchTimer(){
    if(interval1 != -1){
        clearInterval(interval1);
        interval1 = -1;
        runTimer2();
        showIndicator2();
        
    }else if(interval2 != -1){
        clearInterval(interval2);
        interval2 = -1;
        runTimer1();
        showIndicator1();
    }
}

function disableStartBtn(){
    if(hours1 !=0 || minutes1 != 0 || seconds1 != 0){
        startLeftBtn.setAttribute('disabled', 'true');
        startRightBtn.setAttribute('disabled', 'true');
        setBtn.setAttribute('disabled', 'true');
        switchBtn.removeAttribute('disabled');
    }
        
}

function enableStartBtn(){
    if(timerEnd == true){
        startLeftBtn.removeAttribute('disabled');
        startRightBtn.removeAttribute('disabled');
        timerEnd = false;
    }
}

switchBtn.addEventListener('click', switchTimer);

// run timer function for timer 1
function runTimer1(){
    if(hours1 !=0 || minutes1 != 0 || seconds1 != 0 || milliseconds1 != 0){
        if(interval1 == -1){
            interval1 = setInterval(countDown1, 10);
        } else {
            clearInterval(interval1);
            interval1 = -1;
        }
    }
}

// count down function for timer 1 - decrements the timer
function countDown1(){
    if(seconds1 <= 10 && minutes1 <= 0 && hours1 <= 0){
        timer1Display.style.color = "red";
        timer1Milliseconds.style.color = "red"
    }
    if(milliseconds1 > 0){
        milliseconds1--;
    }
    if(milliseconds1 <= 0 && seconds1 > 0){
        milliseconds1 = 99;
        seconds1--;
    }
    if(milliseconds1 <= 0 && seconds1 <= 0 && minutes1 > 0){
        seconds1 = 59;
        minutes1--;
    }
    if(milliseconds1 <= 0 && seconds1 <= 0 && minutes1 <= 0 && hours1 > 0){
        minutes1 = 59;
        seconds1 = 59;
        hours1--;
    }
    if(milliseconds1 <= 0 && seconds1 <= 0 && minutes1 <= 0 && hours1 <= 0){
        clearInterval(interval1);
        interval1 = -1;
        timerEnd = true;
        switchBtn.setAttribute('disabled', 'true');
        setBtn.removeAttribute('disabled');
        hideIndicators();
    } 
    timer1Display.innerText = (hours1 < 10 ? "0" + hours1 : hours1) + ":" + (minutes1 < 10 ? "0" + minutes1 : minutes1) + ":" + (seconds1 < 10 ? "0" + seconds1 : seconds1);
    timer1Milliseconds.innerHTML = Math.floor(milliseconds1/10);
}

function runTimer2(){
    if(hours2 !=0 || minutes2 != 0 || seconds2 != 0 || milliseconds2 != 0){
        if(interval2 == -1){
            interval2 = setInterval(countDown2, 10);
        } else {
            clearInterval(interval2);
            interval2 = -1;
        }
    }
}

function countDown2(){
    // sets timer colour to red when seconds reach 10
    if(seconds2 <= 10 && minutes2 <= 0 && hours2 <= 0){
        timer2Display.style.color = "red";
        timer2Milliseconds.style.color = "red"
    }
    if(milliseconds2 > 0){
        milliseconds2--;
    }
    if(milliseconds2 <= 0 && seconds2 > 0 ){
        milliseconds2 = 99;
        seconds2--;
    }
    if(milliseconds2 <= 0 && seconds2 <= 0 && minutes2 > 0){
        seconds2 = 59;
        minutes2--;
    }
    if(milliseconds2 <= 0 && seconds2 <= 0 && minutes2 <= 0 && hours2 > 0){
        minutes2 = 59;
        seconds2 = 59;
        hours2--;
    }
    if(milliseconds2 <= 0 && seconds2 <= 0 && minutes2 <= 0 && hours2 <= 0){
        clearInterval(interval2);
        interval2 = -1;
        timerEnd = true;
        switchBtn.setAttribute('disabled', 'true');
        setBtn.removeAttribute('disabled');
        hideIndicators();
    } 
    timer2Display.innerText = (hours2 < 10 ? "0" + hours2 : hours2) + ":" + (minutes2 < 10 ? "0" + minutes2 : minutes2) + ":" + (seconds2 < 10 ? "0" + seconds2 : seconds2);
    timer2Milliseconds.innerText = Math.trunc(milliseconds2/10);
}

function stopTimer(){
    if(hours1 !=0 || minutes1 != 0 || seconds1 != 0){
        setBtn.removeAttribute('disabled');
        clearInterval(interval1);
        interval1 = -1;
        clearInterval(interval2);
        interval2 = -1;
        timerEnd = true;
        startLeftBtn.removeAttribute('disabled');
        startRightBtn.removeAttribute('disabled');
        hideIndicators();
    }
}

// sets the chess clock time
function setClock(){
    timer1Display.style.color = "black";
    timer2Display.style.color = "black";
    timer1Milliseconds.style.color = "black";
    timer2Milliseconds.style.color = "black";
    var hours1Input = document.getElementById('duration1-hours').value;
    var minutes1Input = document.getElementById('duration1-minutes').value;
    var seconds1Input = document.getElementById('duration1-seconds').value;

    var hours2Input = document.getElementById('duration2-hours').value;
    var minutes2Input = document.getElementById('duration2-minutes').value;
    var seconds2Input = document.getElementById('duration2-seconds').value;

    if(minutes1Input < 0 || seconds1Input < 0 || minutes2Input < 0 || seconds2Input < 0 || hours1Input < 0 || hours2Input < 0){
        errorDiv.innerText = "Hours, Minutes, or Seconds cannot be less than 0";
    } else if(minutes1Input > 59 || seconds1Input > 59 || minutes2Input > 59 || seconds2Input > 59 || hours1Input > 99 || hours2Input > 99){
        errorDiv.innerText = 'Hours, Minutes, or Seconds exceed input limit';
    } else if(hours1Input != "" && minutes1Input != "" && seconds1Input != "" && hours2Input != "" && minutes2Input != "" && seconds2Input != ""){
        errorDiv.innerText = "";
        hours1 = hours1Input;
        minutes1 = minutes1Input;
        seconds1 = seconds1Input;
        milliseconds1 = 0;

        hours2 = hours2Input;
        minutes2 = minutes2Input;
        seconds2 = seconds2Input;
        milliseconds2 = 0;
        timer1Display.innerText = (hours1 < 10 ? "0" + hours1 : hours1) + ":" + (minutes1 < 10 ? "0" + minutes1 : minutes1) + ":" + (seconds1 < 10 ? "0" + seconds1 : seconds1);
        timer2Display.innerText = (hours2 < 10 ? "0" + hours2 : hours2) + ":" + (minutes2 < 10 ? "0" + minutes2 : minutes2) + ":" + (seconds2 < 10 ? "0" + seconds2 : seconds2);
        timer1Milliseconds.innerText = "00";
        timer2Milliseconds.innerText = "00";
        startLeftBtn.removeAttribute('disabled');
        startRightBtn.removeAttribute('disabled');
    } else{
        errorDiv.innerText = "Please fill all input fields with a duration";
    }
}


// start button to call runTimer1 function
startLeftBtn.addEventListener('click', runTimer1);
startLeftBtn.addEventListener('click', disableStartBtn);
startLeftBtn.addEventListener('click', showIndicator1);

// start button to call runTimer2 function
startRightBtn.addEventListener('click', runTimer2);
startRightBtn.addEventListener('click', disableStartBtn);
startRightBtn.addEventListener('click', showIndicator2);

// buttons to set the clock
setBtn.addEventListener('click', setClock);
setBtn.addEventListener('click', enableStartBtn);

// button to stop the clock
stopBtn.addEventListener('click', stopTimer);