// BarChart.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Extract id for labels and name/total for tooltips
    const labels = data.map((item) => item.id); // Use id for labels
    const totals = data.map((item) => item.total);
    const names = data.map((item) => item.name);

    // Get the context of the canvas element to render the chart
    const ctx = chartRef.current.getContext("2d");

    // Create the bar chart
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels, // Use id for labels
        datasets: [
          {
            label: "Total Distribution",
            data: totals,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              // Custom tooltip to show name and total on hover
              title: function (tooltipItems) {
                const index = tooltipItems[0].dataIndex;
                return names[index]; // Return the name when hovering
              },
              label: function (tooltipItem) {
                const total = tooltipItem.raw;
                return `Total: ${total}`; // Return total value
              },
            },
          },
        },
      },
    });

    // Cleanup the chart when the component is unmounted
    return () => {
      myChart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
