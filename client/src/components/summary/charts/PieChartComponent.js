import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
  Legend,
} from "recharts";
import { useTodoContext } from "../../../hooks/TodoContext.js";

const PieChartComponent = ({ chartTitle }) => {
  const { state } = useTodoContext();

  const tasksDone = state.tasks.filter((task) => task.isDone);
  const tasksNotDone = state.tasks.filter((task) => !task.isDone);

  const data = [
    { name: "Done", value: tasksDone.length },
    { name: "Not Done", value: tasksNotDone.length },
  ];

  const colors = ["#0d9488", "#ef4444"];

  return (
    <div className="border p-4">
      <h1 className="uppercase text-gray-700 text-md font-bold mb-2 md:text-lg text-centr">
        {chartTitle} chart
      </h1>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
            <Label
              value={`${Math.round(
                (tasksDone.length / state.tasks.length) * 100
              )}%`}
              position="center"
              fill={colors[0]}
              fontSize={16}
            />
          </Pie>
          <Legend
            align="right"
            verticalAlign="middle"
            layout="vertical"
            iconType="circle"
            iconSize={7}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
