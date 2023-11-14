import { API_URL } from "../common/config";

export const updateTaskContent = async (taskId, taskDetails) => {
  const response = await fetch(`${API_URL}/decks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify({ taskDetails }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
