const digit = document.querySelectorAll(".digit");
const card = document.querySelectorAll(".card");
const cardFaces = document.querySelector(".card-face");
const cardFrontFace = document.querySelectorAll(".card-face-front");
const cardBackFace = document.querySelectorAll(".card-face-back");
const dayValue = document.querySelector(".day");
const hourValue = document.querySelector(".hour");
const minuteValue = document.querySelector(".minute");
const secondValue = document.querySelector(".second");
let seconds = 9003;
let day;
let hour;
let minute;
let second;
let target;
const timeKeys = ["d", "h", "m", "s"];
let el;

const intiElement = function (type) {
  const els = [{}];

  if (!["d", "h", "m", "s"].includes(type)) return;

  target = document.querySelector(`.flip-timer-${type}`);

  if (!target) return;

  el = els[0];
  el.digit = target.querySelector(".digit");
  el.card = target.querySelector(".card");
  el.cardFace = target.querySelectorAll(".card-face");
  el.cardFaceA = el.cardFace[0];
  el.cardFaceB = el.cardFace[1];

  return el;
};
secondsToTime = function () {
  day = `${Math.floor(seconds / (3600 * 24))}`.padStart(2, "0");
  hour = Number(
    `${Math.floor((seconds % (3600 * 24)) / 3600)}`.padStart(2, "0")
  );
  minute = Number(`${Math.floor((seconds % (60 * 60)) / 60)}`.padStart(2, "0"));
  second = Number(`${Math.floor(seconds % 60)}`.padStart(2, "0"));

  const time = [day, hour, minute, second];

  for (const [i, t] of Object.entries(timeKeys)) {
    const curr = time[i];
    const previous = +curr - 1;
    intiElement(t);
    // if (el.digit.dataset.digitBefore == 0) continue;
    const flip = function () {
      el.card.classList.add("card-face--flip");
      el.digit.dataset.digitBefore = curr;
      el.cardFaceA.textContent = curr;
      const cardClone = el.card.cloneNode(true);
      cardClone.classList.remove("card-face--flip");
      el.digit.replaceChild(cardClone, el.card);
      el.card = cardClone;
      el.cardFace = target.querySelectorAll(".card-face");
      el.cardFaceA = el.cardFace[0];
      el.cardFaceB = el.cardFace[1];

      el.digit.dataset.digitAfter = previous;
      el.cardFaceB.textContent = previous;
    };
    if (el && el.digit) {
      if (!el.digit.dataset.digitBefore) {
        el.digit.dataset.digitBefore = curr;
        el.cardFaceA.textContent = curr;
        el.digit.dataset.digitAfter = previous;
        el.cardFaceB.textContent = previous;
        // return;
      } else if (true) {
        el.card.addEventListener(
          "transitioned",
          function () {
            document.querySelector(".flip-timer-m").dataset.digitBefore = curr;
            document
              .querySelector(".flip-timer-m")
              .querySelector(".card-face-front").textContent = curr;

            const cardClone = el.card.cloneNode(true);
            cardClone.classList.remove("card-face--flip");
            el.digit.replaceChild(cardClone, el.card);
            el.card = cardClone;
            el.cardFace = target.querySelectorAll(".card-face");
            el.cardFaceA = el.cardFace[0];
            el.cardFaceB = el.cardFace[1];
          },
          { once: true }
        );
        el.card.addEventListener(
          "transitionend",
          function () {
            el.digit.dataset.digitBefore = curr;
            el.cardFaceA.textContent = curr;

            const cardClone = el.card.cloneNode(true);
            cardClone.classList.remove("card-face--flip");
            el.digit.replaceChild(cardClone, el.card);
            el.card = cardClone;
            el.cardFace = target.querySelectorAll(".card-face");
            el.cardFaceA = el.cardFace[0];
            el.cardFaceB = el.cardFace[1];

            el.digit.dataset.digitAfter = previous;
            el.cardFaceB.textContent = previous;
          },
          { once: true }
        );
        if (t == "d") {
          if (hour === 0 && !(curr === 0)) flip();
        } else if (t == "h") {
          if (minute === 0 && !(curr === 0)) flip();
        } else if (t == "m") {
          if (second > 57 && !(curr === 0)) {
            flip();
          }
        } else if (t == "s" && !(curr === 0)) {
          el.card.classList.add("card-face--flip");
        }
      }
    }
  }
  if (el.digit.dataset.digitBefore) {
    seconds--;
  }
  console.log(second);
};

secondsToTime();
setInterval(() => {
  secondsToTime();
}, 1000);
// const time = [day, hour.minute, second];
// const inti = function () {
//   cardFrontFace.forEach((face, i) => {
//     face.textContent = time[i];
//     cardBackFace[i].textContent = time[i];
//     digit[i].setAttribute("data-digit-before", day);
//     digit[i].setAttribute("data-digit-after", day);
//   });
// };
// inti();
