// xpChart.js

// Render chart depicting how user's xp over time
window.renderXpChart = function (xpHistory) {
  // If there is no data, just skip
  if (!xpHistory || xpHistory.length === 0) {
    console.log("No XP history found, cannot render chart.");
    return;
  }

  let labels = Object.keys(xpHistory);
  let display_labels = labels.map(date => {
    let [year, month, day] = date.split("-");
    return `${month}-${day}`;
  }); // Get the dates (keys)
  let xpData = Object.values(xpHistory); // Get the XP values (values)

  populateDateSelect(labels);

  // Get the canvas element
  let ctx = document.getElementById("xpChart").getContext("2d");

  // Make a new Chart.js line chart
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: display_labels,
      datasets: [{
        label: 'XP Over Time',
        data: xpData,
        borderColor: '#f2a900',
        backgroundColor: 'rgba(242,169,0,0.2)',
        fill: true,
        tension: 0.2
      }]
    },
    options: {
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            maxTicksLimit: 5
          }
        }
      }
    }
  });
};


function populateDateSelect(dates) {
  const select = document.getElementById('xpDateSelect');
  // Clear existing options except the first one
  select.innerHTML = '<option value="">Select a date</option>';

  // Add dates to select
  dates.forEach(date => {
    const option = document.createElement('option');
    option.value = date;
    option.textContent = date;
    select.appendChild(option);
  });

  // Add change event listener
  select.addEventListener('change', handleDateSelection);
}

function handleDateSelection(event) {
  const date = event.target.value;
  const resultDiv = document.getElementById('xpResult');

  if (!date) {
    resultDiv.textContent = '';
    return;
  }

  const xpAmount = window.xpHistory[date];
  resultDiv.innerHTML = `<strong>XP on ${date}:</strong> ${xpAmount}`;
}