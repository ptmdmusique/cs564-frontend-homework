/** Sample data from the API
 * {
    "id": 47,
    "firstName": "Wylis",
    "lastName": "Hodor",
    "fullName": "Hodor",
    "title": "Servant of House Stark",
    "family": "Stark",
    "image": "hodor.jpg",
    "imageUrl": "https://thronesapi.com/assets/images/hodor.jpg"
    },
 */

const url = "https://thronesapi.com/api/v2/Characters";

const resultContainer = document.querySelector("#results");

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const characterList = await response.json();

    characterList.forEach(({ firstName, lastName, title, imageUrl }) => {
      const fullName = `${firstName} ${lastName}`;

      const contentContainer = document.createElement("figcaption");

      const fullNameEle = document.createElement("p");
      fullNameEle.innerText = fullName;
      fullNameEle.className = "character-name";

      const titleEle = document.createElement("p");
      titleEle.innerText = title;
      titleEle.className = "character-title";

      contentContainer.appendChild(fullNameEle);
      contentContainer.appendChild(titleEle);

      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = fullName;

      const container = document.createElement("li");
      container.className = "character-figure";

      container.appendChild(img);
      container.appendChild(contentContainer);

      resultContainer.appendChild(container);
      resultContainer.classList.add("grid");
    });
  } catch (error) {
    const errorMessage = document.createElement("p");
    errorMessage.innerText = "An error occurred. Please try again.";
    resultContainer.appendChild(errorMessage);
  }
};

fetchData(url);
