# Full Stack Development Project 2

## Pomodoro timer

## Bugs

| Title | Description | Fix | Status |
|-------|-------------|-----|--------|
| Start not working on first click | The user has to click the "Start" button twice when the page is loaded to start the timer. | Changed 'let isPaused = false' to 'let isPaused = true' at the start of the script.js file. | Resolved |
| Nav bar not pinned to top of page | The navigation bar was in a variable position depending on the amount of content on a page | Added a "page" class that kept the centered formatting, and moved the nav bar outside of it. | Resolved |

## Testing

| Feature | Action | Expected Result | Actual Result | Pass/Fail |
|---------|--------|-----------------|---------------|-----------|
| Star Timer | Click "Start" | Timer starts and counts down from 25:00, label changes to "Pause" | Timer starts and counts down correctly, label changes | Pass |
| Pause Timer | Click "Pause" | Timer stops counting down, label changes to "Start" | Timer stops counting down, label changes | Pass | 
| Restart Timer | Click "Restart" while the timer is running and paused | Timer should reset to 25:00 and the label should change to "Start" whether the timer is paused or running | Timer resets to show "25:00" and pauses in both states | Pass |

## Credits

### Code from tutorials

- Pomodoro timer 
    - The basic functionality of the Pomodoro timer was based on the 'Geeks for Geeks - Create a Pomodoro timer using html css and javascript' tutorial. This was then built on to add additional functionality.
- Task list
    - The task list is based on the 'W3 Schools - How to js to do list' tutorial.