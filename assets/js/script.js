/**
 * Basic Pomodoro timer 
 * Counts down from 25 minutes to 0
 * Updates once per second
 * Allows users to pause/resume and restart the timer
*/

/* To test, set the minutes to 0 and seconds to 5 */

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

            Swal.fire({
                icon: "success",
                title: completedWorkSessions % sessionsBeforeLongBreak === 0
                    ? 'Great work!'
                    : 'Good job!',
                text: completedWorkSessions % sessionsBeforeLongBreak === 0
                    ? 'Time for a long break.'
                    : 'Time for a break!'
            });
        } else {
            currentMode = 'work';
            minutes = workMinutes;
            Swal.fire({
                icon: 'warning',
                title: 'Break over!',
                text: 'Time to work!'
            });
        }

        seconds = 0;
        updateTimerStyle();
        startTimer();
    }
} 

// Change the timer label depending on current mode
function updateModeLabel() {
    const modeLabel = document.getElementById('modeLabel');
    if (!modeLabel) return;

    modeLabel.textContent = (currentMode === 'work') ? 'Work' : 'Break';

    modeLabel.classList.remove('work', 'break');
    modeLabel.classList.add(currentMode);
}

// Update the session completed dots
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

/* Save tasks to local storage */

const TASKS_KEY = "tasks";

function getTasks() {
    return JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
}

function saveTasks(tasks) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

function renderTasks(){
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    const tasks = getTasks();
    tasks.forEach(task => addTaskToDOM(task.text, task.checked));
}

function addTaskToDOM(text, checked = false) {
    const li = document.createElement("li");
    li.textContent = text;
    if (checked) li.classList.add("checked");
    const span = document.createElement("span");
    span.className = "close";
    span.textContent = "x";
    // Delete task
    span.addEventListener("click", function (e) {
        e.stopPropagation(); // prevents toggling checked when deleting
        deleteTask(text);
    });
    // Toggle checked
    li.addEventListener("click", function () {
        li.classList.toggle("checked");
        updateTaskChecked(text, li.classList.contains("checked"));
    });
    li.appendChild(span);
    document.getElementById("taskList").appendChild(li);
}

function addTask(text) {
    const tasks = getTasks();
    tasks.push({ text, checked: false });
    saveTasks(tasks);
    renderTasks();
}

function deleteTask(text) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t.text !== text);
    saveTasks(tasks);
    renderTasks();
}

function updateTaskChecked(text, checked) {
    const tasks = getTasks();
    const task = tasks.find(t => t.text === text);
    if (!task) return;
    task.checked = checked;
    saveTasks(tasks);
}

// Create a new list item when clicking on the "Add" button
function newElement() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        Swal.fire({
            title: "Add a description of the task.",
            icon: "warning"
        });
        return;
    }

    addTask(text);
    input.value = "";
}

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

// Save feedback to local storage
function saveFeedback(feedback) {
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push({
        ...feedback,
        date: new Date().toISOString()
    });
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
}

// Add feedback to list
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
document.addEventListener('DOMContentLoaded', function () {
    updateTimerStyle();
    renderTasks();
    displayFeedback();
});