import React, { Component } from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const getRandomColor = () => {
  return `rgb(${Math.random() * 256}, ${Math.random() * 256},${
    Math.random() * 256
  })`;
};
export default class SimplePieChart extends Component {
  state = {
    color: COLORS,
  };
  componentDidMount() {
    let arr = this.state.color.slice();
    setInterval(() => {
      /* const color = this.props.data.map((val) => {
        return getRandomColor();
      }); */

      const poppedVal = arr.pop();
      // console.log("arr", arr);
      // console.log("poppedVal", poppedVal);
      arr.unshift(poppedVal);
      this.setState({ color: arr });
    }, 1000);
  }
  render() {
    const { data } = this.props;
    console.log("this.state.color", this.state.color);
    return (
      <PieChart width={600} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data || []}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="rgb(136, 132, 116)"
          label
        >
          {data.map((sector, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                //                fill={COLORS[index % COLORS.length]}
                fill={this.state.color[index % this.state.color.length]}
              />
            );
          })}
        </Pie>
        {/* <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data02}
          cx={200}
          cy={200}
          innerRadius={40}
          outerRadius={80}
          fill="#82ca9d"
        /> */}
        <Tooltip />
      </PieChart>
    );
  }
}
