async function loadPoints() {
  const res = await fetch("points.json");
  const data = await res.json();

  // casas iniciales
  const houses = {
    calavazaclaw: { name: "Calavazaclaw", color: "calavazaclaw", points: 0 },
    spoilherin: { name: "Spoilherin", color: "spoilherin", points: 0 },
    trubbishdor: { name: "Trubbishdor", color: "trubbishdor", points: 0 },
    bolitapuff: { name: "Bolitapuff", color: "bolitapuff", points: 0 }
  };

  // sumar puntos
  data.forEach(entry => {
    houses[entry.house].points += entry.points;
  });

  const totalPoints = Object.values(houses).reduce((a, h) => a + h.points, 0) || 1;

  // renderizar barras
  const housesDiv = document.getElementById("houses");
  housesDiv.innerHTML = "";

  for (let key in houses) {
    const h = houses[key];
    const percent = (h.points / totalPoints * 100).toFixed(1);

    const div = document.createElement("div");
    div.className = "house";

    div.innerHTML = `
      <img src="img/${key}.png" alt="${h.name}">
      <div class="house-info">
        <strong>${h.name}: ${h.points} puntos</strong>
        <div class="progress-bar">
          <div class="progress ${h.color}" style="width:${percent}%">${percent}%</div>
        </div>
      </div>
    `;
    housesDiv.appendChild(div);
  }

  // renderizar lista de razones
  const list = document.getElementById("points-list");
  list.innerHTML = "";
  data.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.points} puntos → ${houses[entry.house].name} → ${entry.reason}`;
    list.appendChild(li);
  });
}

loadPoints();