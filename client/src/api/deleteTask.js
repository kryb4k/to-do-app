import { API_URL } from "../common/config";

export const deleteTask = async (taskId, dispatch) => {
  try {
    await fetch(`${API_URL}/tasks/delete/${taskId}`, {
      method: "DELETE",
    });
    dispatch({ type: "DELETE_TASK", payload: taskId });
  } catch (error) {
    throw new Error(`Error deleting task: ${error.message}`);
  }
};
