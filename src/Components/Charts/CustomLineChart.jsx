/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

export default function CustomLineChart({ data = [], lines = [], xAxis }) {
  const opacityState = {};
  lines.forEach((lineObj) => {
    opacityState[lineObj.dataField] = 1;
  });

  const [state, setState] = useState({
    opacity: opacityState,
  });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;
    const { opacity } = state;

    setState({
      opacity: { ...opacity, [dataKey]: 0.65 },
    });
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;
    const { opacity } = state;

    setState({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height="100%"
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxis} />
          <YAxis />
          <Tooltip />
          <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          {lines.map((lineObj) => (
            <Line
              type="monotone"
              dataKey={lineObj.dataField}
              strokeOpacity={state.opacity[lineObj.dataField]}
              stroke={lineObj.color}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
