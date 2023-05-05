const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const prettifyString = (string) =>
  capitalizeFirstLetter(string).replace("-", " ");

const courseInputNames = Array.from(
  document.querySelectorAll("input[type='checkbox']"),
).map((input) => input.name);

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const noSubmission = "no submission";
  const objectToLog = {
    name: noSubmission,
    email: noSubmission,
    status: noSubmission,
    "taken course(s)": [],
    other: noSubmission,
  };

  let formNotFilled = true;
  for (const [name, value] of formData) {
    if (name === "status") {
      objectToLog[name] =
        value === "not-chosen" ? noSubmission : prettifyString(value);
    } else if (courseInputNames.includes(name)) {
      objectToLog["taken course(s)"].push(prettifyString(name));
    } else if (!!value) {
      objectToLog[name] = value;
    }

    if (!!value) {
      formNotFilled = false;
    }
  }

  if (formNotFilled) {
    console.warn("You must enter some data to submit this form");
    return;
  }

  console.group("============ Form Submission ============");
  for (const [key, value] of Object.entries(objectToLog)) {
    const displayValue = Array.isArray(value)
      ? value.length > 0
        ? value.join(", ")
        : noSubmission
      : value;

    console.log(`${capitalizeFirstLetter(key)}: ${displayValue}`);
  }
  console.groupEnd();
});
