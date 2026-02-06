let chart;
// update slider values live
const evSlider = document.getElementById("ev");
const renewSlider = document.getElementById("renew");

evSlider.oninput = () => {
  document.getElementById("evVal").innerText = evSlider.value;
};

renewSlider.oninput = () => {
  document.getElementById("renewVal").innerText = renewSlider.value;
};

function runSimulation() {
  const ev = Number(document.getElementById("ev").value);
  const renew = Number(document.getElementById("renew").value);

  fetch("https://climate-change-backend-22cq.onrender.com/simulate", {

    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ev: ev,
      renew: renew
    })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("co2").innerText = data.co2;
    document.getElementById("pollution").innerText = data.pollution;
    document.getElementById("report").innerText = data.report;
    const years = ["Now", "5 Years", "10 Years"];
const emissions = [
  100,
  data.co2 + 10,
  data.co2
];

if (chart) {
  chart.destroy();
}

const ctx = document.getElementById("emissionChart").getContext("2d");
chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: years,
    datasets: [{
      label: "CO₂ Emissions",
      data: emissions,
      borderColor: "#2563eb",
      fill: false,
      tension: 0.3
    }]
  }
});

  })
  .catch(error => {
    console.error("Error:", error);
  });
}




