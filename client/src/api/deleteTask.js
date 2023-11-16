import { API_URL } from "../common/config";

export const deleteTask = async (taskId, dispatch) => {
  try {
    const response = await fetch(`${API_URL}/tasks/delete/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    dispatch({ type: "DELETE_TASK", payload: taskId });
  } catch (error) {
    throw new Error(`Error deleting task: ${error.message}`);
  }
};
