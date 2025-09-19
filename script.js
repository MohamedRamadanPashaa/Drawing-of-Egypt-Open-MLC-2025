// Players by category (name + photo)
const categories = {
  1: [
    {
      name: "Mohamed Hossam",
      photo: "./participants/Mohamed Hossam.jpg",
    },
    { name: "Sohaila Lotfy", photo: "./participants/Sohila Lotfy.jpg" },
  ],
  2: [
    { name: "Sondos Wael", photo: "./participants/Sondos Wael.jpg" },
    {
      name: "Al Houseen Hekal",
      photo: "./participants/Alhoussen Hekal.JPG",
    },
  ],
  3: [
    {
      name: "Youssef Mahmoud",
      photo: "./participants/Youssef Mahmoud.jpg",
    },
    { name: "Yassen Abozead", photo: "./participants/Yassen Ahmed.jpg" },
  ],
  4: [
    { name: "Sama Waseem", photo: "./participants/Sama Wassem.jpg" },
    { name: "Salma Waseem", photo: "./participants/Salma Wassem.jpg" },
  ],
  5: [
    {
      name: "Mohamed Alamin",
      photo: "./participants/Mohamed Abdalazeem Alamin.jpg",
    },
    { name: "Adam Abdo", photo: "./participants/Adam Abdo Abozaid.png" },
  ],
};

const groupADiv = document.getElementById("groupA");
const groupBDiv = document.getElementById("groupB");
const outputDiv = document.getElementById("output");
let groupA = [];
let groupB = [];
let interval = 40000;
let delay = 10000;

const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

function startDraw() {
  groupA = [];
  groupB = [];
  groupADiv.innerHTML = "";
  groupBDiv.innerHTML = "";
  outputDiv.innerHTML = "⬇️ Drawing in progress...";

  // Prepare players with categories
  let allPlayers = [];
  for (let cat in categories) {
    categories[cat].forEach((player) => {
      allPlayers.push({ ...player, category: cat });
    });
  }

  allPlayers = shuffleArray(allPlayers);

  let delay = 0;
  allPlayers.forEach((player, i, arr) => {
    delay += interval; // 10s between players (change to 20000 for 20s)
    setTimeout(() => assignPlayer(player, i, arr.length - 1), delay);
  });
}

function assignPlayer(player, i, lastIndex) {
  let groupACats = groupA.map((p) => p.category);
  let groupBCats = groupB.map((p) => p.category);

  let playerHTML = `
        <div class="player-card" id="player-${i}">
          <div class="img">
            <img src="${player.photo}" alt="${player.name}">  
          </div>
          <div>
            <div><b>${player.name}</b> (${player.category})</div>
          </div>
        </div>
      `;

  if (!groupACats.includes(player.category)) {
    groupA.push(player);
    groupADiv.innerHTML += playerHTML;
    setTimeout(() => {
      document.getElementById(`player-${i}`).classList.add("new");
      setTimeout(() => {
        if (i === lastIndex) {
          outputDiv.innerHTML = "Drawing finished";
        } else {
          outputDiv.innerHTML = "⬇️ Drawing in progress...";
        }
      }, delay);
    }, delay);
    outputDiv.innerHTML = `
        <div class="img">
            <img src="${player.photo}" alt="${player.name}" />
        </div>
        <h4>${player.name} (${player.category})</h4> To Group A
    `;
  } else {
    groupB.push(player);
    groupBDiv.innerHTML += playerHTML;
    setTimeout(() => {
      document.getElementById(`player-${i}`).classList.add("new");
      setTimeout(() => {
        if (i === lastIndex) {
          outputDiv.innerHTML = "Drawing finished";
        } else {
          outputDiv.innerHTML = "⬇️ Drawing in progress...";
        }
      }, delay);
    }, delay);
    outputDiv.innerHTML = `<div class="img">
            <img src="${player.photo}" alt="${player.name}" />
        </div> 
        <h4>${player.name} (${player.category})</h4> To Group B
    `;
  }
}
