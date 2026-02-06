let chart = null; // GLOBAL

function runSimulation() {
  const ev = document.getElementById("ev").value;
  const renew = document.getElementById("renew").value;

  fetch("https://climate-change-backend-22cq.onrender.com/simulate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ev: Number(ev),
      renew: Number(renew)
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("co2").innerText = data.co2;
    document.getElementById("pollution").innerText = data.pollution;
    document.getElementById("report").innerText = data.report;

    const ctx = document.getElementById("emissionChart").getContext("2d");

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Now", "5 Years", "10 Years"],
        datasets: [{
          label: "CO₂ Emissions",
          data: [100, data.co2 + 10, data.co2],
          borderColor: "#2563eb",
          backgroundColor: "rgba(37,99,235,0.2)",
          fill: true,
          tension: 0.4
        }]
      }
    });
  })
  .catch(err => console.error(err));
}








