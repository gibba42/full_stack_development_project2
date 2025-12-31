# Full Stack Development Project 2

## Pomodoro timer

## Bugs

| Title | Description | Fix | Status |
|-------|-------------|-----|--------|
| Start not working on first click | The user has to click the "Start" button twice when the page is loaded to start the timer. | Changed 'let isPaused = false' to 'let isPaused = true' at the start of the script.js file. | Resolved |
| Nav bar not pinned to top of page | The navigation bar was in a variable position depending on the amount of content on a page | Added a "page" class that kept the centered formatting, and moved the nav bar outside of it. | Resolved |
| Feedback not saving emojis | Users can save text on how their session was, but emojis are not saving or being displayed. | Updated the script so that selected emojis are saved and displayed above saved feedback. | Resolved |
| Tasks striking through instead of closing when clicking on cross | After adding a task, the first click on the 'cross' strikes the task through rather than closing it. | Issue was not the strike through formatting, but the size of the close cross. Increased the area of the close cross to make it easier to click. | Resolved |
| Timer not automatically switching to break | When running the timer, once the timer completes a session it is not automatically switching to the next timer. Users have to click "Pause/Start" before it switches. | Issue was caused because the timerUpdate function was checking to see if the timer had reached 00:00 before decreasing the time. Changed the timerUpdate function so that time decreases before the function checks if the timer has reached 00:00. | Resolved |

## Testing

| Feature | Action | Expected Result | Actual Result | Pass/Fail |
|---------|--------|-----------------|---------------|-----------|
| Star Timer | Click "Start" | Timer starts and counts down from 25:00, label changes to "Pause" | Timer starts and counts down correctly, label changes | Pass |
| Pause Timer | Click "Pause" | Timer stops counting down, label changes to "Start" | Timer stops counting down, label changes | Pass | 
| Restart Timer | Click "Restart" while the timer is running and paused | Timer should reset to 25:00 and the label should change to "Start" whether the timer is paused or running | Timer resets to show "25:00" and pauses in both states | Pass |
| Switch to long break after 4 work sessions | Click "Start" and run the timer through 4 cycles | On the fourth cycle, the timer should change to a 20 minute long break | 

## Credits

### Code from tutorials

- Pomodoro timer 
    - The basic functionality of the Pomodoro timer was based on the 'Geeks for Geeks - Create a Pomodoro timer using html css and javascript' tutorial. This was then built on to add additional functionality.
- Task list
    - The task list is based on the 'W3 Schools - How to js to do list' tutorial.
- Feedback form storage
    - The ability for users to save feedback on their sessions is based on the 'peerdh - Building a User Feedback System for Web Applications Using Local Storage' tutorial.