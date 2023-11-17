import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTodoContext } from "../../../hooks/TodoContext";

const BarChartComponent = () => {
  const { state } = useTodoContext();

  const lowPriorityTasks = state.tasks.filter((task) => task.priority === 1);
  const mediumPriorityTasks = state.tasks.filter((task) => task.priority === 2);
  const highPriorityTasks = state.tasks.filter((task) => task.priority === 3);

  const data = [
    { priority: "Low", count: lowPriorityTasks.length },
    { priority: "Medium", count: mediumPriorityTasks.length },
    { priority: "High", count: highPriorityTasks.length },
  ];

  const colors = ["#059669", "#ea580c", "#be123c"];

  return (
    <div className="border p-4">
      <h1 className="uppercase text-gray-700 text-md font-bold mb-2 md:text-2xl">
        Priority Distribution
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priority" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" maxBarSize={50}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
