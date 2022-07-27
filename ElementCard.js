export default function ElementCard(atomicNumber, symbol, name, atomicMass, shells, color) {
  const element = {
    atomicNumber: atomicNumber || "108",
    symbol: symbol || "og",
    name: name || "oganesson",
    atomicMass: atomicMass || "(294)",
    shells: shells || [2, 8, 18, 32, 32, 18, 8],
    color: color || "#ccc",
  };

  function createCard() {
    const card = document.createElement("div");
    card.className = "card";
    card.style.background = element.color;
    card.innerHTML = createCardContent(element);
    card.appendChild(createAtomicRing(element.shells));

    return card;
  }

  function createCardContent(element) {
    return `
      <div class="card-content">
        <div class="card-number">${element.atomicNumber}</div>
        <h1 class="card-symbol">${element.symbol}</h1>
        <p class="card-name">${element.name}</p>
        <p class="card-atomic-mass">${element.atomicMass}</p>
        <div class="card-atomic-shells">${sideShellsNumber(element.shells)}</div>
      </div>
    `;
  }

  function createAtomicRing(shells) {
    shells = shells.reverse();
    const shellsContainer = document.createElement("div");
    shellsContainer.className = "card-shells";
    let rotateTime = Array.from({ length: 7 }, (_, i) => i + 1).reverse();

    for (let i = 0; i < shells.length; i++) {
      const atomicRing = document.createElement("div");
      atomicRing.className = "card-shells-ring";

      const ringDiameter = 235 - (i + 1) * 25;
      atomicRing.style.width = ringDiameter + "px";
      atomicRing.style.height = ringDiameter + "px";
      atomicRing.style.animation = `rotation ${rotateTime[i] * 10}s linear infinite`;
      shellsContainer.appendChild(atomicRing);
      // 1 = border ring thickness
      const radius = ringDiameter / 2 - 1;
      const angle = 360 / shells[i];

      for (let j = 1; j <= shells[i]; j++) {
        const shellAtom = document.createElement("div");
        shellAtom.classList.add("card-shells-atom");

        const y = Math.sin(angle * j * (Math.PI / 180)) * radius;
        const x = Math.cos(angle * j * (Math.PI / 180)) * radius;

        shellAtom.style.top = (y + radius).toString() + "px";
        shellAtom.style.left = (x + radius).toString() + "px";

        atomicRing.appendChild(shellAtom);
      }
    }
    return shellsContainer;
  }

  function sideShellsNumber(numbers) {
    return numbers.map((number) => `<span class="card-shell-num">${number}</span>`).join("");
  }

  return createCard();
}
