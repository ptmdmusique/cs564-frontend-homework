// Add your code here
const START_CLASS = "btn-primary";
const STOP_CLASS = "btn-danger";
const BASE_TRANSITION_DURATION = 3000;
const BASE_BACKGROUND_CLASS = "bg-primary";

const input = document.querySelector("#interval");
const callToActionButton = document.querySelector("#cta");
const body = document.querySelector("body");
body.style.transitionDuration = `${BASE_TRANSITION_DURATION}ms`;

let interval;

const startInterval = () => {
  body.classList.remove(BASE_BACKGROUND_CLASS);
  const newIntervalInMs = input.value * 1000;

  interval = setInterval(() => {
    const newRGBA = `rgba(${getNewRandomColorValue()}, ${getNewRandomColorValue()}, ${getNewRandomColorValue()}, 0.5)`;
    body.style.backgroundColor = newRGBA;

    body.style.transitionDuration = Math.max(
      BASE_TRANSITION_DURATION,
      input.value / 10,
    );
  }, Math.max(newIntervalInMs, BASE_TRANSITION_DURATION));

  input.disabled = true;
  modifyCTA("start");
};

const stopInterval = () => {
  clearInterval(interval);
  input.disabled = false;
  modifyCTA("stop");
};

const modifyCTA = (type) => {
  const isStart = type === "stop";

  callToActionButton.classList.add(isStart ? START_CLASS : STOP_CLASS);
  callToActionButton.classList.remove(isStart ? STOP_CLASS : START_CLASS);

  callToActionButton.textContent = isStart ? "Start" : "Stop";

  callToActionButton.removeEventListener(
    "click",
    isStart ? stopInterval : startInterval,
  );
  callToActionButton.addEventListener(
    "click",
    isStart ? startInterval : stopInterval,
  );
};

const getNewRandomColorValue = () => Math.floor(Math.random() * 256);

// * --- main
callToActionButton.addEventListener("click", startInterval);
