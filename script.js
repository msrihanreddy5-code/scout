let chart;

async function generateReport() {
  const team = document.getElementById("teamSelect").value;
  const response = await fetch("data.json");
  const data = await response.json();
  const teamData = data[team];

  document.getElementById("playstyle").innerText =
    "Playstyle: " + teamData.playstyle;
  document.getElementById("strength").innerText =
    "Strength: " + teamData.strength;
  document.getElementById("weakness").innerText =
    "Weakness: " + teamData.weakness;

  const table = document.getElementById("playerTable");
  table.innerHTML = "";
  teamData.players.forEach(p => {
    table.innerHTML += `<tr><td>${p.name}</td><td>${p.pattern}</td></tr>`;
  });

  const tips = document.getElementById("tips");
  tips.innerHTML = "";
  teamData.tips.forEach(t => {
    tips.innerHTML += `<li>${t}</li>`;
  });

  const ctx = document.getElementById("siteChart");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["A Site", "B Site", "Mid"],
      datasets: [{
        data: teamData.sites
      }]
    }
  });
}
