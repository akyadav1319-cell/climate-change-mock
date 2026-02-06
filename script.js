function runSimulation() {
  const ev = Number(document.getElementById("ev").value);
  const renew = Number(document.getElementById("renew").value);
  const industry = Number(document.getElementById("industry").value);
  const trees = Number(document.getElementById("trees").value);

  fetch("https://climate-change-backend-22cq.onrender.com/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ev, renew })
  })
    .then(res => res.json())
    .then(data => {
      let adjustedCO2 = data.co2;
      adjustedCO2 -= industry * 0.2;
      adjustedCO2 -= trees * 0.1;
      adjustedCO2 = Math.max(0, Math.round(adjustedCO2));

      document.getElementById("co2").innerText = adjustedCO2;
      document.getElementById("pollution").innerText = data.pollution;
      document.getElementById("report").innerText = data.report;

      const years = ["Now", "5 Years", "10 Years"];
      const emissions = [100, adjustedCO2 + 10, adjustedCO2];

      if (chart) chart.destroy();

      const ctx = document.getElementById("emissionChart").getContext("2d");
      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: years,
          datasets: [{
            label: "CO₂ Emissions",
            data: emissions,
            borderColor: "#2563eb",
            tension: 0.3
          }]
        }
      });
    })
    .catch(err => console.error(err));
}





