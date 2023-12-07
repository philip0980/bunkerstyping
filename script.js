const hello = document.getElementById("hello");
const input = document.querySelector(".inputField");

let typedWord = "";
let score = 1;
let level = 61;
let level1 = 1200;
let intervalId;

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
  clearInterval(intervalId); // Clear the existing interval
  intervalId = setInterval(() => {
    random();
  }, level1);
}

setNewInterval(); // Initial setup

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
      alert(`Game over 😭\nYour score is ${hello.innerHTML}`);
      alert("Press OK to play again");
      clearInterval(dropIntervalId);
      span.remove();
      location.reload();
    }
  }

  return span;
}

input.addEventListener("input", (event) => {
  typedWord = input.value.trim();

  if (typedWord !== "") {
    const spans = document.querySelectorAll("span");
    spans.forEach((span) => {
      if (typedWord === span.id) {
        clearInterval(span.dropIntervalId);
        span.remove();
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
