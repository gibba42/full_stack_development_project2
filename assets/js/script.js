/**
 * Basic Pomodoro timer 
 * Counts down from 25 minutes to 0
 * Updates once per second
 * Allows users to pause/resume and restart the timer
*/

let timer; // Holds the interval returned by setInterval()
const workMinutes = 25;
const breakMinutes = 5;
let minutes = workMinutes;
let seconds = 0;
let currentMode = 'work' // Tracks whether the user is working or on a break
let isPaused = true; // Stage flag to know whether the user has paused the timer

/**
 * Starts the timer 'tick'
 * Updates the timer every 1000ms (1 second)
 */
function startTimer() {
    clearInterval(timer);
    timer = setInterval(updateTimer,1000);
}

/**
 * Runs once per second while the timer is active
 */
function updateTimer() {
    const timerElement = document.getElementById('timer');
    // Update the time remaining on the page
    timerElement.textContent = formatTime(minutes, seconds);
    // If paused, do not count down
    if (isPaused) return;
    // If the timer is completed (00:00), switch modes
    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        if (currentMode === 'work') {
            currentMode = 'break';
            minutes = breakMinutes;
            seconds = 0;
            alert('Good job, time for a break!');
        } else {
            currentMode = 'work';
            minutes = workMinutes;
            seconds = 0;
            alert('Break over, time to work!');
        }
        startTimer();
        return;
    }
    //Otherwise, decrease time remaining
    if (seconds > 0 ) {
        seconds--;
    } else {
        seconds = 59;
        minutes--;
    }
}

/**
 * Formats minutes and seconds as "MM:SS"
 * padStart(2, '0') ensures single digits show with a leading zero
 */
function formatTime(minutes, seconds) {
    return`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Toggles between paused and running states.
 * When pausing, clears interval and switches button text to "Resume"
 * When resuming: restarts interval and switches button text to "Pause"
 */
function togglePauseResume() {
    const pauseResumeButton = 
        document.querySelector('.control-buttons button');
    // Switches the state, running -> paused, paused -> running
    isPaused = !isPaused;

    if (isPaused) {
        // Stops the 1 second intervals while paused
        clearInterval(timer);
        pauseResumeButton.textContent = 'Start';
    } else {
        // Restarts the 1 second intervals when resumed
        startTimer();
        pauseResumeButton.textContent = 'Pause';
    }
}

/* Resets the timer back to 25:00 and restarts immediately */
function restartTimer() {
    clearInterval(timer);
    currentMode = 'work';
    minutes = workMinutes;
    seconds = 0;
    // Ensures the timer state is "running"
    isPaused = false;
    // Updates the display so that it shows the reset values
    const timerElement = 
        document.getElementById('timer');
    timerElement.textContent = 
        formatTime(minutes, seconds);
    // Resets the pause/resume button back to "Pause"
    const pauseResumeButton = 
        document.querySelector('.control-buttons button');
    pauseResumeButton.textContent = 'Pause';
    // Restart the timer
    startTimer();
}

/**
 * To do list
 * Allows users to add tasks below the timer and tick them off as they're completed
 */

//Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("taskInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("Add a description of the task.");
    } else {
        document.getElementById("taskList").appendChild(li);
    }
    document.getElementById("taskInput").value = "";
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}