import React, { useCallback, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function CustomPieChart() {
  const initialOpactity = {
    'Group A': 1,
    'Group B': 1,
    'Group C': 1,
    'Group D': 1,
  };
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = React.useState({
    opacity: initialOpactity,
  });

  const handleMouseEnter = (o) => {
    const { value } = o;

    setState({
      opacity: { ...initialOpactity, [value]: 1.035 },
    });
  };

  const handleMouseLeave = (o) => {
    const { value } = o;

    setState({
      opacity: { ...initialOpactity, [value]: 1 },
    });
  };

  return (
    <ResponsiveContainer width={300} height={300}>
      <PieChart>
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              // eslint-disable-next-line react/no-array-index-key
              key={`cell-${index}`}
              strokeWidth={5}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          // margin={300}
          height={100}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
