const handleInput = (event) => {
  const resultElement = document.querySelector("#result");
  resultElement.className = ""; // Clear all classes
  const classList = resultElement.classList;

  const inputNumber = event.target.value;

  if (parseInt(inputNumber) < 0) {
    resultElement.textContent = "Please enter a positive number.";
    classList.add("text-danger");
    return;
  }

  if (inputNumber.length === 0) {
    // Don't really care about float, we just check as usual
    resultElement.textContent = "";
    return;
  }

  const isNotPalindrome = inputNumber
    .split("")
    .some(
      (digit, index) => digit !== inputNumber[inputNumber.length - index - 1],
    );

  if (!isNotPalindrome) {
    resultElement.textContent = "Yes. This is a palindrome!";
    classList.add("text-success");
    return;
  }

  resultElement.textContent = "No. Try again.";
  classList.add("text-danger");
};

const elem = document.querySelector("input");
elem.addEventListener("input", handleInput);
