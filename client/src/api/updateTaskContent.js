import { API_URL } from "../common/config";

export const updateTaskContent = async (updatedTask) => {
  const response = await fetch(`${API_URL}/tasks/update/${updatedTask.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedTask),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
