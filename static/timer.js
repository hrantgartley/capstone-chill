document.addEventListener("DOMContentLoaded", function () {
  const timerForm = document.getElementById("timerForm");
  const timerInput = document.getElementById("timerInput");
  const startTimerButton = document.getElementById("startTimer");
  const timerDisplay = document.getElementById("timerDisplay");
  const stopTimerButton = document.getElementById("stopTimer");
  const separateTimerDisplay = document.getElementById("separateTimerDisplay");

  let timerInterval;
  let separateTimerInterval;
  let remainingTime = 0;
  let isCountingDown = false;
  let isSecondaryTimerRunning = false;

  startTimerButton.addEventListener("click", function () {
    const timeInMinutes = parseInt(timerInput.value);

    if (!isNaN(timeInMinutes) && timeInMinutes > 0) {
      remainingTime = timeInMinutes * 60;
      clearInterval(timerInterval);
      isCountingDown = true;

      // Reset the secondary timer immediately
      isSecondaryTimerRunning = false;

      // Update the timer every second
      timerInterval = setInterval(updateTimer, 1000);
      updateTimer();
    }
  });

  stopTimerButton.addEventListener("click", function () {
    clearInterval(timerInterval);
    isCountingDown = false;

    if (isSecondaryTimerRunning) {
      clearInterval(separateTimerInterval);
      isSecondaryTimerRunning = false;
    }
  });

  function updateTimer() {
    if (remainingTime <= 0) {
      if (isCountingDown) {
        // Timer reached 0, start counting into negatives
        timerDisplay.innerHTML = "Time's up!";
        let timeSinceZero = 0;

        isSecondaryTimerRunning = false;

        separateTimerInterval = setInterval(() => {
          separateTimerDisplay.innerHTML = `-${timeSinceZero}s`;
          timeSinceZero++;
        }, 1000);

        isSecondaryTimerRunning = true;
        clearInterval(timerInterval);
      }
    } else {
      const seconds = Math.abs(remainingTime);
      timerDisplay.innerHTML = `${remainingTime < 0 ? "-" : ""}${seconds}s`;
      remainingTime--;
    }
  }
});

// document.addEventListener("DOMContentLoaded", function () {
//   const countdownDisplay = document.getElementById("countdownDisplay");
//   const countupDisplay = document.getElementById("countupDisplay");
//   const timeInput = document.getElementById("timeInput");
//   const startButton = document.getElementById("startButton");
//   const pauseButton = document.getElementById("pauseButton");

//   let countdownInterval;
//   let countupInterval;
//   let remainingTime = 0;
//   let elapsedSeconds = 0;
//   let isCountingDown = false;
//   let isCountingUp = false;
//   let isPaused = false;
//   let hasFinished = false;

//   timeInput.addEventListener("input", function () {
//     pauseButton.disabled = isCountingDown || isCountingUp;
//   });

//   startButton.addEventListener("click", function () {
//     const timeInMinutes = parseInt(timeInput.value);
//     if (!isNaN(timeInMinutes) && timeInMinutes > 0) {
//       if (isCountingDown || isCountingUp) {
//         clearInterval(countdownInterval);
//         clearInterval(countupInterval);
//         countupDisplay.textContent = "";
//       }
//       hasFinished = false;
//       remainingTime = timeInMinutes * 60;
//       startCountdown(remainingTime);
//     }
//   });

//   pauseButton.addEventListener("click", function () {
//     if (isCountingDown) {
//       if (!isPaused) {
//         clearInterval(countdownInterval);
//         isPaused = true;
//         pauseButton.textContent = "Resume";
//       } else {
//         startCountdown(remainingTime);
//         isPaused = false;
//         pauseButton.textContent = "Pause";
//       }
//     }
//   });

//   function startCountdown(timeInSeconds) {
//     if (isCountingDown) {
//       clearInterval(countdownInterval);
//     }
//     if (isPaused) {
//       isPaused = false;
//       pauseButton.textContent = "Pause";
//     }
//     countupDisplay.textContent = "";
//     countdownInterval = setInterval(function () {
//       if (remainingTime <= 0) {
//         clearInterval(countdownInterval);
//         countdownDisplay.textContent = "Time's up!";
//         isCountingDown = false;
//         pauseButton.disabled = true;
//         hasFinished = true;
//         startCountup();
//       } else {
//         updateCountdownDisplay(remainingTime);
//         remainingTime--;
//       }
//     }, 1000);
//     isCountingDown = true;
//     pauseButton.disabled = false;
//   }

//   function startCountup() {
//     countupInterval = setInterval(function () {
//       updateCountupDisplay(elapsedSeconds);
//       elapsedSeconds++;
//     }, 1000);
//     isCountingUp = true;
//     startButton.disabled = false;
//   }

//   function updateCountdownDisplay(timeInSeconds) {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = timeInSeconds % 60;
//     countdownDisplay.textContent = `${minutes}:${String(seconds).padStart(
//       2,
//       "0"
//     )}`;
//   }

//   function updateCountupDisplay(elapsedSeconds) {
//     const minutes = Math.floor(elapsedSeconds / 60);
//     const seconds = elapsedSeconds % 60;
//     countupDisplay.textContent = `It's been ${minutes}:${String(
//       seconds
//     ).padStart(2, "0")} since the drink was frozen`;
//   }
// });
