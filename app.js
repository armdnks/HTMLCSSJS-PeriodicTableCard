import ElementCard from "./ElementCard.js";
import elements from "./data.js";

const cardContainer = document.querySelector(".card-container");
const categoryColor = {
  "diatomic nonmetal": "#2a9df4",
  "noble gas": "#7e57c2",
  "transition metal": "#f57f17",
};

elements.forEach((element) => {
  const { atomicNumber, symbol, name, atomicMass, shells, category } = element;
  const elementCard = new ElementCard(atomicNumber, symbol, name, atomicMass, shells, categoryColor[category]);
  cardContainer.appendChild(elementCard);
});
