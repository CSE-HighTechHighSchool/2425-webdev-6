// Render chart depicting how user's xp over time
window.renderXpChart = function (xpHistory) {
  // If you have no data, just skip
  if (!xpHistory || xpHistory.length === 0) {
    console.log("No XP history found, cannot render chart.");
    return;
  }

  // Build arrays for labels & data
  let labels = xpHistory.map(item => item.date);
  let xpData = xpHistory.map(item => item.xp);

  // Debug
  console.log("Labels:", labels);
  console.log("XP Data:", xpData);

  // Get the canvas element
  let ctx = document.getElementById("xpChart").getContext("2d");

  // Make a new Chart.js line chart
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
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
        y: {
          beginAtZero: true
        }
      }
    }
  });
};