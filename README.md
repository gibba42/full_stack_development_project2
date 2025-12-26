# Full Stack Development Project 2

## Pomodoro timer

## Bugs

| Title | Description | Fix | Status |
|-------|-------------|-----|--------|
| Start not working on first click | The user has to click the "Start" button twice when the page is loaded to start the timer. | Changed 'let isPaused = false' to 'let isPaused = true' at the start of the script.js file. | Resolved |