import { API_URL } from "../common/config";

export const deleteTask = async (taskId) => {
  await fetch(`${API_URL}/tasks/delete/${taskId}`, {
    method: "DELETE",
  });
};
