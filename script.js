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

  fetch("https://climate-change-backend-22cq.onrender.com", {

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
  })
  .catch(error => {
    console.error("Error:", error);
  });
}


