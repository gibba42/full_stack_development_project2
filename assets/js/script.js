/**
 * Basic Pomodoro timer 
 * Counts down from 25 minutes to 0
 * Updates once per second
 * Allows users to pause/resume and restart the timer
*/

let timer; // Holds the interval returned by setInterval()
// Timer variables
const workMinutes = 25;
const breakMinutes = 5;
const longBreakMinutes = 20;
const sessionsBeforeLongBreak = 4;
let completedWorkSessions = 0;
let minutes = workMinutes;
let seconds = 0;
let currentMode = 'work'; // Tracks whether the user is working or on a break
let isPaused = true; // Stage flag to know whether the user has paused the timer

/**
 * Starts the timer 'tick'
 * Updates the timer every 1000ms (1 second)
 */
function startTimer() {
    clearInterval(timer);
    timer = setInterval(updateTimer,1000);
}

/* Update timer style based on the current mode */
function updateTimerStyle() {
    const timerElement = document.getElementById('timer');
    timerElement.classList.remove('work', 'break');
    timerElement.classList.add(currentMode);

    updateModeLabel();
    updateSessionUI();
}

/**
 * Runs once per second while the timer is active
 */
function updateTimer() {
    const timerElement = document.getElementById('timer');

    // If paused, just keep showing the current time
    timerElement.textContent = formatTime(minutes, seconds);
    if (isPaused) return;

    // Decrease time remaining
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    }

    // Update display after decrement
    timerElement.textContent = formatTime(minutes, seconds);

    // If timer has reached 00:00, switch mode immediately
    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);

        if (currentMode === 'work') {
            completedWorkSessions++;

            currentMode = 'break';
            minutes = (completedWorkSessions % sessionsBeforeLongBreak === 0)
                ? longBreakMinutes
                : breakMinutes;

            alert(completedWorkSessions % sessionsBeforeLongBreak === 0
                ? 'Great work! Time for a long break.'
                : 'Good job, time for a break!');
        } else {
            currentMode = 'work';
            minutes = workMinutes;
            alert('Break over, time to work!');
        }

        seconds = 0;
        updateTimerStyle();
        startTimer();
    }
} 

function updateModeLabel() {
    const modeLabel = document.getElementById('modeLabel');
    if (!modeLabel) return;

    modeLabel.textContent = (currentMode === 'work') ? 'Work' : 'Break';

    modeLabel.classList.remove('work', 'break');
    modeLabel.classList.add(currentMode);
}

function updateSessionUI() {
    const sessionText = document.getElementById('sessionText');
    const dotsWrap = document.getElementById('sessionDots');
    const total = typeof sessionsBeforeLongBreak !== 'undefined' ? sessionsBeforeLongBreak : 4;
    const done = typeof completedWorkSessions !== 'undefined' ? (completedWorkSessions % total) : 0;

    if (sessionText) {
        sessionText.textContent = `Session ${done}/${total}`;
    }

    if (dotsWrap) {
        const dots = dotsWrap.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('filled', idx < done);
        });
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

/* Resets the timer back to 25:00 and pauses */
function restartTimer() {
    clearInterval(timer);
    currentMode = 'work';
    minutes = workMinutes;
    seconds = 0;
    completedWorkSessions = 0; // Resets the work sessions count
    updateTimerStyle();
    // Ensures the timer state is "paused" and updates the button to "Start"
    isPaused = false;
    togglePauseResume();
    // Updates the display so that it shows the reset values
    const timerElement = 
        document.getElementById('timer');
    timerElement.textContent = 
        formatTime(minutes, seconds);
}

/**
 * To do list
 * Allows users to add tasks below the timer and tick them off as they're completed
 */

// Create a new list item when clicking on the "Add" button
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

// Create a "close" button and append it to each list item
var myNodeList = document.querySelectorAll("#taskList li");
var i;
for (i = 0; i < myNodeList.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodeList[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i=0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

/**
 * Feedback form
 */
document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const mood = document.querySelector('input[name="mood"]:checked')?.value || '';
    const feedbackMessage = document.getElementById('feedback-text').value;
    const feedback = {mood, feedbackMessage};

    saveFeedback(feedback);
    displayFeedback();
    this.reset();
});

function saveFeedback(feedback) {
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push({
        ...feedback,
        date: new Date().toISOString()
    });
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
}

function displayFeedback() {
    const feedbackList = document.getElementById('feedbackList');
    feedbackList.innerHTML = '';
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    const moodImages = {
        happy: 'assets/images/ranking-happy.png',
        okay: 'assets/images/ranking-okay.png',
        bad: 'assets/images/ranking-bad.png'
    };
    const moodAlts = {
        happy: 'happy smiley-face',
        okay: 'okay smiley-face',
        bad: 'sad smiley-face'
    };
    feedbacks.forEach(feedback => {
        const feedbackItem = document.createElement('div');
        feedbackItem.classList.add('feedback-item');
        const moodSrc = moodImages[feedback.mood];
        const moodAlt = moodAlts[feedback.mood] || 'mood';
        const date = feedback.date
            ? new Date(feedback.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })
            : '';
        feedbackItem.innerHTML = `
            ${moodSrc ? `<img class="mood-icon" src="${moodSrc}" alt="${moodAlt}">` : ''}
            <p>${feedback.feedbackMessage}</p>
            ${date ? `<small class="feedback-date">${date}</small>` : ''}
        `;
        feedbackList.appendChild(feedbackItem);
    });
}

// Reset the saved feedback
document.getElementById('resetFeedback').addEventListener('click', function () {
    const confirmReset = confirm(
        'Are you sure you want to delete all saved feedback?'
    );
    if (confirmReset) {
        localStorage.removeItem('feedbacks');
        displayFeedback();
    }
});

// Update timer on page load
document.addEventListener('DOMContentLoaded', function () {
    updateTimerStyle();
    displayFeedback();
});
// Display feedback on page load
document.addEventListener('DOMContentLoaded', displayFeedback);