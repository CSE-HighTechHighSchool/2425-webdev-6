/* xpChart.js */

window.renderXpChart = function (xpHistory) {
  
    // If you have no data, just skip
    if (!xpHistory || xpHistory.length === 0) {
      console.log("No XP history found, cannot render chart.");
      return;
    }
  
    // Build arrays for labels & data
    let labels = xpHistory.map(item => item.date);   // e.g. ["2024-10-01", "2024-10-03", ...]
    let xpData = xpHistory.map(item => item.xp);     // e.g. [10, 20, ...]
  
    // Get the canvas element from account.html
    let ctx = document.getElementById("xpChart").getContext("2d");
  
    // Make a new Chart.js line chart
    new Chart(ctx, {
      type: 'line',  // or 'bar'
      data: {
        labels: labels,
        datasets: [{
          label: 'XP Over Time',
          data: xpData,
          borderColor: '#f2a900',   // golden color
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
  