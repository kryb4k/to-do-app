import { useState, useEffect } from "react";
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
  const [strokeDasharray, setStrokeDasharray] = useState("3 3");

  const lowPriorityTasks = state.tasks.filter((task) => task.priority === 1);
  const mediumPriorityTasks = state.tasks.filter((task) => task.priority === 2);
  const highPriorityTasks = state.tasks.filter((task) => task.priority === 3);

  const data = [
    { priority: "Low", count: lowPriorityTasks.length },
    { priority: "Medium", count: mediumPriorityTasks.length },
    { priority: "High", count: highPriorityTasks.length },
  ];

  useEffect(() => {
    const dynamicValues = calculateDynamicValues();
    setStrokeDasharray(dynamicValues);
  }, [state.tasks]); // You might want to adjust the dependencies based on when you want the values to change

  const calculateDynamicValues = () => {
    const length = state.tasks.length;
    return `${length} ${length}`;
  };
  const colors = ["#059669", "#ea580c", "#be123c"];

  return (
    <div className="md:w-full">
      {state.tasks.length ? (
        <div>
          <h1 className="uppercase text-gray-700 text-md font-bold mb-2 md:text-lg ">
            Priority Distribution
          </h1>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray={strokeDasharray} />
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
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default BarChartComponent;
