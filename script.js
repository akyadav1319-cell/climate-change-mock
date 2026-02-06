let chart = null;   // ✅ GLOBAL variable (THIS fixes the error)

document.addEventListener("DOMContentLoaded", () => {
  const evSlider = document.getElementById("ev");
  const renewSlider = document.getElementById("renew");

  const evVal = document.getElementById("evVal");
  const renewVal = document.getElementById("renewVal");

  evVal.innerText = evSlider.value;
  renewVal.innerText = renewSlider.value;

  evSlider.oninput = () => {
    evVal.innerText = evSlider.value;
  };

  renewSlider.oninput = () => {
    renewVal.innerText = renewSlider.value;
  };
});

function runSimulation() {
  const ev = Number(document.getElementById("ev").value);
  const renew = Number(document.getElementById("renew").value);

  fetch("https://climate-change-backend-22cq.onrender.com/simulate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ev, renew })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("co2").innerText = data.co2;
      document.getElementById("pollution").innerText = data.pollution;
      document.getElementById("report").innerText = data.report;

      const ctx = document
        .getElementById("emissionChart")
        .getContext("2d");

      const years = ["Now", "5 Years", "10 Years"];
      const emissions = [100, data.co2 + 10, data.co2];

      // ✅ Safe destroy
      if (chart !== null) {
        chart.destroy();
      }

      // ✅ Recreate chart
      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: years,
          datasets: [{
            label: "CO₂ Emissions",
            data: emissions,
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,0.2)",
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true }
          }
        }
      });
    })
    .catch(err => console.error(err));
}







