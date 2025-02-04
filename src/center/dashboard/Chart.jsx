import React from "react";

const Chart = () => {
  const data = [
    { month: "January", traffic: 10 },
    { month: "February", traffic: 20 },
    { month: "March", traffic: 30 },
    { month: "April", traffic: 60 },
    { month: "May", traffic: 50 },
    { month: "June", traffic: 40 },
    { month: "July", traffic: 70 },
  ];

  const maxTraffic = Math.max(...data.map((d) => d.traffic));

  return (
    <div className="container-fluid mt-2 rounded border border-2 bg-white p-2">
      <div className="d-flex flex-column gap-2">
        {data.map((item) => (
          <div key={item.month} className="d-flex align-items-center">
            <div className="me-2" style={{ width: "80px" }}>
              {item.month}
            </div>

            <div className="progress" style={{ width: "100%" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${(item.traffic / maxTraffic) * 100}%` }}
                aria-valuenow={(item.traffic / maxTraffic) * 100}
                aria-valuemin="0"
                aria-valuemax={maxTraffic}
              >
                {item.traffic}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
