// HOME-START
const navHomeBtn = document.querySelector(".nav--home");
const navCarouselBtn = document.querySelector(".nav--carousel");
const navStopwatchBtn = document.querySelector(".nav--stopwatch");

const home = document.querySelector("#home");
const stopwatch = document.querySelector("#stopwatch");
const carousel = document.querySelector("#carousel");

const navButton = document.querySelector(".navBtn");

const mainHeading = document.querySelector("#mainHeading");

navButton.addEventListener("click", () => {
  document.querySelector(".navbar").classList.toggle("navbar--open");
});

navHomeBtn.addEventListener("click", () => {
  navHomeBtn.classList.add("selected");
  navCarouselBtn.classList.remove("selected");
  navStopwatchBtn.classList.remove("selected");

  home.style.display = "flex";
  carousel.style.display = "none";
  stopwatch.style.display = "none";
  mainHeading.textContent = "MyApp";
});

navCarouselBtn.addEventListener("click", () => {
  navHomeBtn.classList.remove("selected");
  navCarouselBtn.classList.add("selected");
  navStopwatchBtn.classList.remove("selected");

  home.style.display = "none";
  carousel.style.display = "block";
  stopwatch.style.display = "none";
  mainHeading.textContent = "Carousel";
});

navStopwatchBtn.addEventListener("click", () => {
  navHomeBtn.classList.remove("selected");
  navCarouselBtn.classList.remove("selected");
  navStopwatchBtn.classList.add("selected");

  home.style.display = "none";
  carousel.style.display = "none";
  stopwatch.style.display = "flex";
  mainHeading.textContent = "Stopwatch";
});
// HOME-END

// CAROUSEL--START
let counter = 1;
const totalImages = 4;

const imgEle = document.querySelector(".slider--img");

for (let i = 2; i <= totalImages; i++) {
  const temp = document.createElement("div");
  temp.classList.add("slider--icon");
  temp.classList.add(`icon-${i}`);
  temp.setAttribute("onclick", `showImg(${i})`);
  document
    .querySelector(`.icon-${i - 1}`)
    .insertAdjacentElement("afterend", temp);

  const imgtemp = document.createElement("img");
  imgtemp.classList.add("gallery--img");
  imgtemp.src = `images/img-${i}.png`;
  document
    .querySelector("#gallery")
    .insertAdjacentElement("beforeend", imgtemp);
}

function changeImg(n) {
  counter += n;
  if (counter > totalImages) {
    counter = 1;
  }

  if (counter <= 0) {
    counter = totalImages;
  }

  for (let i = 1; i <= totalImages; i++) {
    document.querySelector(`.icon-${i}`).classList.remove("slider--selected");
  }

  document.querySelector(`.icon-${counter}`).classList.add("slider--selected");

  imgEle.src = `images/img-${counter}.png`;
}
function showImg(n) {
  counter = 0;
  changeImg(n);
}

document.querySelector(".right").addEventListener("click", () => {
  changeImg(1);
});

document.querySelector(".left").addEventListener("click", () => {
  changeImg(-1);
});

setInterval(() => {
  document.querySelector(".right").click();
}, 2000);

const toggleBtn = document.querySelector(".toggle--btn");
toggleBtn.addEventListener("click", () => {
  document.querySelector("#pictures").classList.toggle("hidden");
  if (toggleBtn.textContent === "Show") {
    toggleBtn.textContent = "Hide";
  } else {
    toggleBtn.textContent = "Show";
  }
});
// CAROUSEL--END

// STOPWATCH--START
let hours = 0,
  minutes = 0,
  seconds = 0;
let timer;
const startBtn = document.querySelector("#str");
const flagBtn = document.querySelector("#flag");
const pauseResumeBtn = document.querySelector("#pares");
const resetBtn = document.querySelector("#reset");

const flagTimesList = document.querySelector("#flag--times");

const activateTimer = () => {
  timer = setInterval(changeSecond, 1000);
};

const deactivateTimer = () => {
  clearInterval(timer);
};

const toggleButtons = () => {
  startBtn.classList.toggle("hidden");
  flagBtn.classList.toggle("hidden");
  pauseResumeBtn.classList.toggle("hidden");
  resetBtn.classList.toggle("hidden");
};

const updateDisplay = (eleId, v) => {
  const temp = document.querySelector(`#${eleId}`);
  if (v < 10) {
    temp.textContent = "0" + v;
  } else {
    temp.textContent = v;
  }
};

function changeSecond() {
  seconds += 1;

  if (seconds === 60) {
    minutes += 1;

    if (minutes === 60) {
      hours += 1;
      minutes = 0;
      updateDisplay("hours", hours);
    }

    seconds = 0;
    updateDisplay("minutes", minutes);
  }

  updateDisplay("seconds", seconds);
}

startBtn.addEventListener("click", () => {
  activateTimer();
  toggleButtons();
});

pauseResumeBtn.addEventListener("click", () => {
  if (pauseResumeBtn.textContent === "Pause") {
    deactivateTimer();
    pauseResumeBtn.textContent = "Resume";
  } else {
    pauseResumeBtn.textContent = "Pause";
    activateTimer();
  }
});

resetBtn.addEventListener("click", () => {
  toggleButtons();
  deactivateTimer();
  hours = 0;
  minutes = 0;
  seconds = 0;
  updateDisplay("hours", hours);
  updateDisplay("minutes", minutes);
  updateDisplay("seconds", seconds);

  pauseResumeBtn.textContent = "Pause";

  while (flagTimesList.hasChildNodes()) {
    flagTimesList.removeChild(flagTimesList.firstChild);
  }
});

flagBtn.addEventListener("click", () => {
  const hrs = document.querySelector("#hours").textContent;
  const mns = document.querySelector("#minutes").textContent;
  const scs = document.querySelector("#seconds").textContent;
  const cTime = hrs + " : " + mns + " : " + scs;

  const temp = document.createElement("li");
  temp.textContent = cTime;
  temp.classList.add("flag--time");

  flagTimesList.insertAdjacentElement("beforeend", temp);
});
// STOPWATCH--END
