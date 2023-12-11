const hello = document.getElementById("hello");
const input = document.querySelector(".inputField");
const muteButton = document.querySelector(".mute");

let typedWord = "";
let score = 1;
let level = 61;
let level1 = 1200;
let intervalId;

// Load the sound
const blastSound = new Audio("blast-sound.mp3");
const gameOver = new Audio("game-over.mp3");
const ahh = new Audio("yemete-kudasai.mp3");

const names = [
  "alochan",
  "pooja",
  "manish",
  "nikesh",
  "pranav",
  "amash",
  "niraj",
  "bipin",
  "amit",
  "sweety",
  "aryan",
  "palak",
  "prachi",
  "sameer",
  "lisa",
  "biraj",
  "luffy",
];

if (!localStorage.getItem("userName")) {
  const userName = prompt("Please enter your name:");
  localStorage.setItem("userName", userName || "Player");
}

// Function to send score and username to the backend
function sendScoreToBackend(username, score) {
  const data = { name: username, score };

  // fetch("http://localhost:8000", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log("Score sent to the backend:", data);
  //   })
  //   .catch((error) => {
  //     console.error("Error sending score to the backend:", error);
  //   });

POST  HTTP/1.1
Host: http://localhost:8000
Accept: application/json
Content-Type: application/json
Content-Length: 42

{ name: username, score }
}

function setNewInterval() {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    random();
  }, level1);
}

setNewInterval();

function random() {
  const index = Math.floor(Math.random() * names.length);
  const span = Span(names[index]);
  document.body.appendChild(span);
}

function Span(word) {
  const span = document.createElement("span");
  span.innerHTML = word;
  span.id = word;
  let pos = Math.floor(Math.random() * (window.innerWidth - 100));
  span.style.position = "absolute";
  span.style.left = pos + "px";
  span.style.top = "60px";
  document.body.appendChild(span);

  const dropIntervalId = setInterval(() => {
    drop(span, dropIntervalId);
  }, level);

  span.dropIntervalId = dropIntervalId;

  function drop(span) {
    let top = parseFloat(span.style.top);
    top++;
    span.style.top = top + "px";

    if (top > window.innerHeight) {
      if (score >= 5) {
        const username = localStorage.getItem("userName");
        sendScoreToBackend(username, score);
        alert(
          `Congratulations Mr.${localStorage.getItem(
            "userName"
          )}😃\nYou have won the prize  of 1 assignment\nWIth the total score of ${
            hello.innerHTML
          }`
        );
        alert("Press OK to play again");
        clearInterval(dropIntervalId);
        span.remove();
        location.reload();
      } else {
        console.log("Game over ");
        gameOver.play();
        alert(`Game over 😭\nYour score is ${hello.innerHTML}`);
        alert("Press OK to play again");
        clearInterval(dropIntervalId);
        span.remove();
        location.reload();
      }
    }
  }

  return span;
}

input.addEventListener("input", () => {
  typedWord = input.value.trim();

  if (typedWord !== "") {
    const spans = document.querySelectorAll("span");
    spans.forEach((span) => {
      if (typedWord === span.id) {
        clearInterval(span.dropIntervalId);

        span.classList.add("blast");

        typedWord === span.id && span.id === "aryan"
          ? ahh.play()
          : blastSound.play();
        span.addEventListener("animationend", () => {
          span.remove();
        });

        hello.innerHTML = score++;

        if (score % 5 === 0) {
          level -= 10;
          if (level1 >= 600) {
            level1 -= 50;
          }
          setNewInterval();
        }
        input.value = "";
      }
    });
  }
});

input.addEventListener("keypress", (event) => {
  if (event.key === " ") {
    typedWord = input.value.trim();

    if (typedWord !== "") {
      const spans = document.querySelectorAll("span");
      spans.forEach((span) => {
        if (typedWord === span.id) {
          clearInterval(span.dropIntervalId);

          // Apply blast animation class
          span.classList.add("blast");

          // Play the blast sound
          blastSound.play();

          // Remove the element after the animation ends
          span.addEventListener("animationend", () => {
            span.remove();
          });

          hello.innerHTML = score++;

          if (score % 5 === 0) {
            level -= 10;
            if (level1 >= 600) {
              level1 -= 50;
            }
            setNewInterval();
          }
          input.value = " ";
        } else {
          input.value = " ";
        }
      });
    }
  }
});

// Set focus to the input field on page load
input.focus();

muteButton.addEventListener("click", toggle);

if (localStorage.getItem("isMuted") === null) {
  localStorage.setItem("isMuted", "false");
}

if (localStorage.getItem("isMuted") === "true") {
  mute();
}

function toggle() {
  if (!isMuted()) {
    mute();
    localStorage.setItem("isMuted", "true");
  } else {
    unmute();
    localStorage.setItem("isMuted", "false");
  }
}

function isMuted() {
  return blastSound.muted && gameOver.muted && ahh.muted;
}

function mute() {
  blastSound.muted = true;
  gameOver.muted = true;
  ahh.muted = true;
  muteButton.innerHTML = "Unmute";
}

function unmute() {
  blastSound.muted = false;
  gameOver.muted = false;
  ahh.muted = false;
  muteButton.innerHTML = "Mute";
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 600) {
    // If screen width is less than or equal to 600 pixels (considered as mobile)
    showMobileWarning();
  }
});

// Function to show the mobile warning dialog
function showMobileWarning() {
  const mobileWarning = document.getElementById("mobile-warning");
  mobileWarning.style.display = "block";

  // Add a click event listener to close the warning
  document
    .getElementById("close-warning")
    .addEventListener("click", function () {
      mobileWarning.style.display = "none";
    });
}
