import React from "react";

import {
  BarChart,
  Bar,
  Rectangle,
  LineChart,
  Line,
  XAxis,
  YAxis,

} from "recharts";




const ClientsAnalysis = () => {
  

  const clientdata = [
    {name: 'Jan', value:100},
    {name: 'Feb', value:21},
    {name: 'Mar', value:46},
    {name: 'Apr', value:31},
    {name: 'May', value:50},
    {name: 'Jun', value:70},
    {name: 'Jul', value:96},
    {name: 'Aug', value:110},
    {name: 'Sep', value:98},
    {name: 'Oct', value:160},
    {name: 'Nov', value:81},
    {name: 'Dec', value:64},
  ]

  const genderdata = [
    {name: 'male', value:24},
    {name: 'Female', value:231},

  ]

  const data = [
    {name: 'Youtube', value:63},
    {name: 'Facebook', value:47},
    {name: 'Friends', value:82},
    {name: 'Instagram', value:51},
  ]

  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ padding: "0px 215px" }}>
          <div className="chart-analysis">
            <div className="stats">
              <h4 className="stats__title">Client Grow Chart</h4>

              <LineChart
                width={550}
                height={300}
                data={clientdata}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1D8CF8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </div>

            <div className="stats">
              <h4 className="stats__title">Gender Ratio Chart</h4>
              <BarChart
                width={300}
                height={300}
                data={genderdata}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />

                <Bar
                  dataKey="value"
                  fill="#7734a9d9"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
              </BarChart>
            </div>

            <div className="stats">
              <h4 className="stats__title">Client Soucre Chart</h4>
              <BarChart
                width={550}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />

                <Bar
                  dataKey="value"
                  fill="#7734a9d9"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsAnalysis;
