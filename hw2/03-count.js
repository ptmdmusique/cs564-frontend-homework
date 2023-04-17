// Add your code here

const highlightClass = "bg-warning";

const textContainer = document.getElementById("text-container");
// Restructure the original text container
const originalTextSpanList = textContainer.innerText.split(" ").map((word) => {
  const newSpan = document.createElement("span");
  newSpan.innerText = word;
  newSpan.style.transitionDuration = "100ms";
  return newSpan;
});

textContainer.innerHTML = "";
originalTextSpanList.forEach((wordSpan) => {
  textContainer.appendChild(wordSpan);
  textContainer.appendChild(document.createTextNode(" "));
});

const handleHighlight = (textToHighlight) => {
  originalTextSpanList.forEach((wordSpan) => {
    const word = wordSpan.innerText;
    const textToHighlightList = textToHighlight.split(" ");

    wordSpan.classList[textToHighlightList.includes(word) ? "add" : "remove"](
      highlightClass,
    );
  });
};

const input = document.getElementById("input");
const handleKeyDown = (event) => {
  const text = event.target.value;
  handleHighlight(text);
};

input.addEventListener("input", handleKeyDown);
