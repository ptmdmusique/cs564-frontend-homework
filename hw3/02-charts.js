const backgroundColors = [
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(255, 99, 132, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(199, 199, 199, 0.8)",
  "rgba(83, 102, 255, 0.8)",
  "rgba(40, 159, 64, 0.8)",
  "rgba(210, 199, 199, 0.8)",
  "rgba(78, 52, 199, 0.8)",
];

const borderColors = [
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(255, 99, 132, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(159, 159, 159, 1)",
  "rgba(83, 102, 255, 1)",
  "rgba(40, 159, 64, 1)",
  "rgba(210, 199, 199, 1)",
  "rgba(78, 52, 199, 1)",
];

// url for the Thrones API
const url = "https://thronesapi.com/api/v2/Characters";

const renderChart = async () => {
  const donutChart = document.querySelector(".donut-chart");

  const { familyNameList, familyCounters } = await extractAndAnalyzeData(url);

  new Chart(donutChart, {
    type: "doughnut",
    data: {
      labels: familyNameList,
      datasets: [
        {
          label: "My First Dataset",
          data: familyCounters,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
  });
};

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

/** Mapping from a possible bad family name to a good one */
const badFamilyLookupMap = {
  "": "Unknown",
  Unkown: "Unknown",
  Lorathi: "Lorathi",
  "House Lanister": "House Lannister",
};

const extractAndAnalyzeData = async (url) => {
  const familyNameList = [];
  const familyCounters = [];

  try {
    const response = await fetch(url);
    const characterList = await response.json();

    const familyLookupMap = characterList.reduce((accumulator, { family }) => {
      const cleanedFamily = family.toLowerCase().includes("house")
        ? badFamilyLookupMap[family] || family
        : "Unknown";

      if (accumulator[cleanedFamily]) {
        accumulator[cleanedFamily] += 1;
      } else {
        accumulator[cleanedFamily] = 1;
      }

      return accumulator;
    }, {});

    Object.entries(familyLookupMap).forEach(([familyName, familyCount]) => {
      familyNameList.push(familyName);
      familyCounters.push(familyCount);
    });
  } catch (error) {
    console.error("error:", error);
  }

  return { familyNameList, familyCounters };
};

renderChart();
