const hello = document.getElementById("hello");
const input = document.querySelector(".inputField");

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
      console.log("Game over ");
      gameOver.play();
      alert(`Game over 😭\nYour score is ${hello.innerHTML}`);
      alert("Press OK to play again");
      clearInterval(dropIntervalId);
      span.remove();
      location.reload();
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
