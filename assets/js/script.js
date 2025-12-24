/**
 * Basic Pomodoro timer 
 * Counts down from 25 minutes to 0
 * Updates once per second
 * Allows users to pause/resume and restart the timer
*/

let timer; // Holds the interval returned by setInterval()
let minutes = 25; // Current minutes remaining in the timer, defaults to 25
let seconds = 0; // Current seconds remaining in the timer, defauls to 0
let isPaused = false; // Stage flag to know whether the user has paused the timer

/**
 * Starts the timer 'tick'
 * Updates the timer every 1000ms (1 second)
 */
function startTimer() {
    timer = setInterval(updateTimer,1000);
}

/**
 * Runs once per second while the timer is active
 */
function updateTimer() {
    const timerElement = 
        document.getElementById('timer');
    // Updates the time remaining on the page 
    timerElement.textContent = 
        formatTime(minutes, seconds);
    // Checks if the timer is completed (00:00)
    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        alert('Time is up! Take a break.');
    /**
     * If the timer is not completed or paused, decreases the time remaining
     * If there are only seconds remaining, just decrease seconds
     * Otherwise, decrease by one minute and set seconds to 59
     */
    } else if (!isPaused) {
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            minutes--;
        }
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
        pauseResumeButton.textContent = 'Resume';
    } else {
        // Restarts the 1 second intervals when resumed
        startTimer();
        pauseResumeButton.textContent = 'Pause';
    }
}

/* Resets the timer back to 25:00 and restarts immediately */
function restartTimer() {
    clearInterval(timer);
    // Reset countdown values to 25:00
    minutes = 25;
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

// Start the timer on page load
startTimer();