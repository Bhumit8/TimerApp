

// selecting and storing elements in const variable 
const timerDisplay = document.querySelector('#timer');
const startBtn = document.querySelector('#start-button');
const resetBtn = document.querySelector('#reset-button'); 
const durationBtn = document.querySelector('#submit-duration');

// const settingsMenu = document.getElementById("setting-menu");

// settingsMenu.style.display = "none";
const defaultBackgroundBtn = document.getElementById("default-bg-btn");
const backgroundBtn1 = document.getElementById("btn1");
const backgroundBtn2 = document.getElementById("btn2");
const backgroundBtn3 = document.getElementById("btn3");
const backgroundBtn4 = document.getElementById("btn4");
const backgroundBtn5 = document.getElementById("btn5");
const backgroundBtn6 = document.getElementById("btn6");
const backgroundBtn7 = document.getElementById("btn7");
const backgroundBtn8 = document.getElementById("btn8");
const backgroundBtn9 = document.getElementById("btn9");
const backgroundBtn10 = document.getElementById("btn10");

const htmlElement = document.querySelector("html");



defaultBackgroundBtn.addEventListener('click', (event) =>{
    /* background css was generated from http://www.gradientcss.com/ */
    htmlElement.style.backgroundColor = "#85FFBD";
    htmlElement.style.backgroundImage = "linear-gradient(120deg, #85FFBD 0%, #FFFB7D 100%)";
})

backgroundBtn1.addEventListener('click', (event) =>{
    /* background css was generated from http://www.gradientcss.com/ */
    htmlElement.style.backgroundColor = "#FFE53B";
    htmlElement.style.backgroundImage = "linear-gradient(120deg, #FFE53B 0%, #FF2525 100%)";
})


backgroundBtn2.addEventListener('click', (event) =>{
    /* background css was generated from http://www.gradientcss.com/ */
    htmlElement.style.backgroundColor = "#21D4FD";
    htmlElement.style.backgroundImage = "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)";
})

backgroundBtn3.addEventListener('click', (event) =>{
    /* background css was generated from http://www.gradientcss.com/ */
    htmlElement.style.backgroundColor = "#FEE140";
    htmlElement.style.backgroundImage = "linear-gradient(90deg, #FEE140 0%, #FA709A 100%)";
})

backgroundBtn4.addEventListener('click', (event) =>{
    /* background css was generated from http://www.gradientcss.com/ */
    htmlElement.style.backgroundColor = "#08AEEA";
    htmlElement.style.backgroundImage = "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)";
    
})

backgroundBtn5.addEventListener('click', (event) =>{
    /* background css was generated from http://www.gradientcss.com/ */
    htmlElement.style.backgroundColor = "#4158D0";
    htmlElement.style.backgroundImage = "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)";
})

backgroundBtn6.addEventListener('click', (event) =>{
    /* background css was generated from http://www.gradientcss.com/ */
    htmlElement.style.backgroundColor = "#FBAB7E";
    htmlElement.style.backgroundImage = "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)";
})

backgroundBtn7.addEventListener('click', (event) =>{
    /* background css was generated from http://www.gradientcss.com/ */
    htmlElement.style.backgroundColor = "#F4D03F";
    htmlElement.style.backgroundImage = "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)";
})


backgroundBtn8.addEventListener('click', (event) =>{
    /* background css was generated from http://www.gradientcss.com/ */
    htmlElement.style.backgroundColor = "#FF9A8B";
    htmlElement.style.backgroundImage = "linear-gradient(180deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)";
})

backgroundBtn9.addEventListener('click', (event) =>{
    /* background css was generated from http://www.gradientcss.com/ */
    htmlElement.style.backgroundColor = "#cbf8ee";
    htmlElement.style.backgroundImage = "linear-gradient(90deg, #cbf8ee 0%, #b8c5fa 100%)";
})

backgroundBtn10.addEventListener('click', (event) =>{
    /* background css was generated from http://www.gradientcss.com/ */
    htmlElement.style.backgroundColor = "#000000";
    htmlElement.style.backgroundImage = "linear-gradient(0deg, #000000 0%, #414141 74%)";
})



const circle = document.querySelector('#timer-ring');
// gets perimeter of the circle
const circlePerimeter = circle.getAttribute('r') * 2 * Math.PI;

circle.setAttribute('stroke-dasharray', circlePerimeter);


var blockDivs = document.getElementById('timeBlocks');

var blockDiv = document.getElementsByClassName('timeDiv');

// variables to store seconds and minutes
var seconds = 0;
var minutes = 0;

// variables to store setIntervals
var interval = -1;
var ringInterval = -1;

// stroke-dashoffset value of the circle svg - to make the ring empty
var strokeOffset = -880;

// variable to store sound when timer ends
var timerAudio = new Audio("countdownBeep.mp3");

//variable for keeping track of time sessions
var sessionTracker = 0

//Events to keep track of user activities
window.onkeyup = function(){
    sessionTracker = 0
}
window.onmousemove = function(){
    sessionTracker = 0
}
window.ontouchmove = function(){
    sessionTracker = 0
}
window.onclick = function(){
    sessionTracker = 0
}

//Displays message if login sessions comes to an end
function checkUserActivity(){
    if(sessionTracker > 0){
        window.setTimeout("checkUserActivity", 60000)
    }
    else{
        window.alert("Your current session is expired due to inactivity")
    }
}

// convertDecimalDuration to convert a time duration from decimal format to minutes and seconds
function convertDecimalDuration(){
    if(minutes < 1 && minutes > 0){
        seconds = Math.round(minutes / 0.016667);
        minutes = 0;
    }
    if(minutes > 1 && minutes % 1 != 0){
        var fraction = minutes.toString().split('.')[1];
        var decimals = parseInt(fraction, 10);
        if(fraction.length == 1){
            seconds = Math.round((decimals / 10) / 0.016667);
            minutes = Math.floor(minutes);

        } else if( fraction.length == 2){
            seconds = Math.round((decimals / 100) / 0.016667);
            minutes = Math.floor(minutes);
        }
    }
    if(minutes >= 1 && minutes % 1 ==0 && seconds <= 0){
        minutes = minutes;
        seconds = 0;
    }
}

// runTimer function - starts and stops the timer
function runTimer(){
    strokeOffset = -880;

    var activeDiv = document.getElementsByClassName('activeBlock').item(0);
    activeDiv.childNodes[0].setAttribute('disabled', 'true');
    activeDiv.childNodes[1].setAttribute('disabled', 'true');
    activeDiv.childNodes[2].setAttribute('disabled', 'true');
    activeDiv.childNodes[3].setAttribute('disabled', 'true');
    if(minutes <= 0 && seconds <= 0){
        minutes = activeDiv.childNodes[2].value;
    }
    
    convertDecimalDuration();

    // updates and formats the timerDisplay to the current minutes and seconds
    timerDisplay.innerText = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + Math.trunc(seconds) : Math.trunc(seconds));

            if(interval == -1){
                startBtn.innerText = 'PAUSE';
                console.log("Stopping Timer");
                // countDown method is called every 50 milili seconds using setInterval funcition
                    // the value returned from the setInterver function is assigned to interval

                let currentTotalDuration = (minutes * 60) + seconds;
                if(currentTotalDuration == activeDiv.childNodes[2].value * 60 ){
                        setTimeout(() =>  
                    {
                        interval = setInterval(countDown, 50);

                    },900)
                } else{
                    interval = setInterval(countDown, 50);
                }
            } else {
                    // the interval stops if interval is not equal to -1
                    clearInterval(interval);
                    // setting interval back to -1
                    interval = -1;
                    startBtn.innerText = 'START';
                    timerAudio.pause();
                    console.log("Stopping Timer");
            }
}

// countDown function - decrements the timer's seconds and minutes
function countDown(){
    
    // if seconds or minutes are greater than 0, seconds are decremented by 1
    if(seconds > 0 || minutes > 0){
        seconds = seconds - .05;
    }
    // if seconds become less than or euqal to 0, yet minutes are greater than 0, 
    // the minute is decremented by 1 and seconds are set to 59
    if(seconds < 0 && minutes > 0){
        seconds = 59.999;
        minutes--;
    } 

    //if minute left is 1 play the audio 
    if(minutes== 0 && seconds <= 10){
        timerAudio.play();
    }
    // if both seconds are minutes are less than or equal to 0
    if(seconds <= 0 && minutes <= 0){
        clearInterval(interval);
        timerAudio.pause();
        console.log("Stopping Timer");
        interval = -1;
        startBtn.innerText = 'START';
        // the code for next timeblock runs after 1 second
        setTimeout(() =>  
        {
            getTimeBlock();
            if(minutes > 0){
            // the next timeblock countdown begins after 1 second
            setTimeout(runTimer, 1000);
            } 
     } , 1000);

    }
    
    let currentDuration = (minutes * 60) + seconds;
    // reduces timer ring
    if(circlePerimeter * currentDuration / getTotalDuration() - circlePerimeter > -880){
        circle.setAttribute('stroke-dashoffset', circlePerimeter * currentDuration / getTotalDuration() - circlePerimeter);
    }
    // updates and formats the timer display after each interval
    timerDisplay.innerText = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + Math.trunc(seconds) : Math.trunc(seconds));
    
}

// function to reset the timer ring
function ringReset(){
    if(ringInterval == -1){
        ringInterval = setInterval(resetRing, 5);
    } else {
        clearInterval(ringInterval);
        ringInterval = -1;
    }
}
// function to fill up the timer ring
function resetRing(){
    if(strokeOffset < 0){
        strokeOffset = strokeOffset + 11;
        circle.setAttribute('stroke-dashoffset', strokeOffset);
    } else{
        ringReset();
    }
}

// function gets total duration of the current active time block
function getTotalDuration(){
    const totalDuration = document.getElementsByClassName('activeBlock').item(0).childNodes[2].value * 60;
    return totalDuration;
}

// resetTimer function - resets the timer to the initial time
function resetTimer(){
    ringReset();

    // clearInterval to stop the running timer
    clearInterval(interval);
    interval = -1;
    
    minutes = 0;
    seconds = 0;

    var activeDiv = document.getElementsByClassName('activeBlock').item(0);
    activeDiv.childNodes[0].removeAttribute('disabled');
    activeDiv.childNodes[1].removeAttribute('disabled');
    activeDiv.childNodes[2].removeAttribute('disabled');
    activeDiv.childNodes[3].removeAttribute('disabled');
    // setting the timer back to default 1 minute and 0 seconds
    minutes = activeDiv.childNodes[2].value;
    convertDecimalDuration();
    // update timer dislay and format
    timerDisplay.innerText = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + Math.trunc(seconds) : Math.trunc(seconds));
}

// getDuration function - gets the next time block to run 
function getTimeBlock(){
    ringReset();

    // gets the current active timeblock 
    var activeDiv = document.getElementsByClassName('activeBlock').item(0);
    // loops through the timeblock divs
    for(var i = 0; i < blockDiv.length; i++){ 
        // if the current timeblock is located
        if(blockDiv[i] == activeDiv){
            // if theere exists a timeblock after the current timeblock
            // the next timeblock becomes the active timeblock
            if(i+1 < blockDiv.length){
                blockDiv[i+1].classList.add('activeBlock');
                minutes = blockDiv[i+1].childNodes[2].value;
                
                blockDiv[i+1].childNodes[0].setAttribute('disabled', 'true');
                blockDiv[i+1].childNodes[1].setAttribute('disabled', 'true');
                blockDiv[i+1].childNodes[2].setAttribute('disabled', 'true');
                blockDiv[i+1].childNodes[3].setAttribute('disabled', 'true');

                activeDiv.classList.remove('activeBlock');
                activeDiv.childNodes[0].removeAttribute('disabled');
                activeDiv.childNodes[1].removeAttribute('disabled');
                activeDiv.childNodes[2].removeAttribute('disabled');
                activeDiv.childNodes[3].removeAttribute('disabled');
            } else{
                activeDiv.childNodes[0].removeAttribute('disabled');
                activeDiv.childNodes[1].removeAttribute('disabled');
                activeDiv.childNodes[2].removeAttribute('disabled');
                activeDiv.childNodes[3].removeAttribute('disabled');
            }          
        }
    }
}

// addTimeBlock function - creates a new timeblock with a name and a time duration provided by the user
function addTimeBlock(){
    // selecting the block name and duration values from their input fields
    var blockName = document.getElementById('block-name').value;
    var duration = document.getElementById('duration').value;
    var goal = document.getElementById('goal').value;

    /** Handling invalid input **/

    // gets the error div
    errorDiv = document.getElementById('errorDiv');
    // if the blockName input is empty
    if(blockName == ""){
        if(errorDiv.hasChildNodes()){
            errorDiv.removeChild(errorDiv.childNodes[0]);
        }
        const noNameError = document.createElement('p');
        noNameError.textContent = 'Please enter a name';
        errorDiv.appendChild(noNameError);
    // else if the duration input is 0 or empty
    } else if(duration == 0 || "" || isNaN(duration)){
        if(errorDiv.hasChildNodes()){
            errorDiv.removeChild(errorDiv.childNodes[0]);
        }
        const invalidDuration = document.createElement('p');
        invalidDuration.textContent = 'Please enter a valid duration';
        errorDiv.appendChild(invalidDuration);
    // else create a new time block
    } else{
        // remove any error messages appeneded to error div
        if(errorDiv.hasChildNodes()){
            errorDiv.removeChild(errorDiv.childNodes[0]);
        }

    // creates a new time block div
    let timeBlock = document.createElement('div');
    // sets time block div's class to timDiv
    timeBlock.setAttribute('class', 'timeDiv');
    // creates new input element for retrieving the name of the time block
    let nameInput = document.createElement('input');
    nameInput.setAttribute('class', 'nameInput');
    // setting the input type to 'text'
    nameInput.setAttribute('type', 'text');
    // setting input value to blockName
    nameInput.setAttribute('value', blockName);

    // creates new input element for entering the duration
    let durationInput = document.createElement('input');
    
    // setting type of durationInput to 'number'
    durationInput.setAttribute('type', 'number');
    durationInput.setAttribute('class', 'durationInput');
    // setting value of durationInput to duration
    durationInput.setAttribute('value', duration);

    //creates new input element for entering the goal 
    let goalInput = document.createElement('input');
    //setting type of goalInput to 'text'
    goalInput.setAttribute('type', 'text');
    //setting value of goalInput to goal
    goalInput.setAttribute('value', goal);

    // creates a delete button
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'deleteBtn');
    deleteButton.textContent = 'REMOVE';

    // the nameInput, durationInput, goalInput and deleteButton are appended to timeBlock div as its children elements
    timeBlock.appendChild(goalInput);
    timeBlock.appendChild(nameInput);
    timeBlock.appendChild(durationInput);
    timeBlock.appendChild(deleteButton);
    
    // the timeBlock div is appended to blockDivs div
    blockDivs.appendChild(timeBlock);

    // adds active class to the added time block div if there is only 1 time block
    // active class is used to indicate which timeblock is running
    if(blockDiv.length == 1){
        blockDiv[0].classList.add('activeBlock');
        minutes = blockDiv[0].childNodes[2].value;
    }   
}   
}

// deleteBlock function - deletes the time block if the user clicks on the remove button
function deleteBlock(e){
    const item = e.target;
    if(item.parentElement.nextSibling != null){
        item.parentElement.nextSibling.classList.add('activeBlock');
    }else if(item.parentElement.previousSibling != null){
        item.parentElement.previousSibling.classList.add('activeBlock');
    }
    if(item.classList[0] === 'deleteBtn'){
        item.parentElement.remove();
    }
    resetTimer();
}

// calls deleteBlock function when clicking on time block div
blockDivs.addEventListener('click', deleteBlock);


// button for running and pausing the timer
startBtn.addEventListener('click', runTimer);
// button for resetting timer
resetBtn.addEventListener('click', resetTimer);
// button for adding a new time block
durationBtn.addEventListener('click', addTimeBlock);


// stores all time blocks in arrays
var timeBlockData = [];
function timeBlockArray(){
    for(var i = 0; i < blockDiv.length; i++){
        let timeBlockA = [blockDiv[i].childNodes[1].value, blockDiv[i].childNodes[2].value];
        timeBlockData.push(timeBlockA);
    }
}

// converts the time blocks to a csv format and downloads the csv file
 function downloadCSV() {
     timeBlockArray();
     var csv = '';
     timeBlockData.forEach(function(row) {
             csv += row.join(',');
             csv += "\n";
     });
     var csvDownload = document.createElement('a');
     csvDownload.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
     csvDownload.target = '_blank';
     csvDownload.download = 'timeData.csv';
     csvDownload.click();
 }

 // button to download/export the time configuration csv file
 const downloadBtn = document.querySelector('#csv-download');
 downloadBtn.addEventListener('click', downloadCSV);
  
 // button to import csv time configurations
 const importBtn = document.querySelector('#csv-import');

 // creates time blocks for the imported time configurations
 importBtn.addEventListener('click', ()=> {
     blockDivs.innerHTML = '';
     Papa.parse(document.getElementById('csv-upload').files[0], {
         download: true,
         header: false,
         complete: function(results){
             for(var i = 0; i < results.data.length-1; i++){
                let timeBlock = document.createElement('div');
                timeBlock.setAttribute('class', 'timeDiv');

                let nameInput = document.createElement('input');
                nameInput.setAttribute('type', 'text');
                nameInput.setAttribute('value', results.data[i][0]);

                let durationInput = document.createElement('input');
                durationInput.setAttribute('type', 'number');
                durationInput.setAttribute('value', results.data[i][1]);

                let goalInput = document.createElement('input');
                goalInput.setAttribute('type', 'text');
                goalInput.setAttribute('value',results.data[i][2]);

                let deleteButton = document.createElement('button');
                deleteButton.setAttribute('class', 'deleteBtn');
                deleteButton.textContent = 'REMOVE';

                timeBlock.appendChild(nameInput);
                timeBlock.appendChild(durationInput);
                timeBlock.appendChild(goalInput);
                timeBlock.appendChild(deleteButton);
                
                blockDivs.appendChild(timeBlock);
                if(i == 0){
                    blockDiv[0].classList.add('activeBlock');
                    minutes = blockDiv[0].childNodes[2].value;
                }
             }
         }
     });
 });

 
