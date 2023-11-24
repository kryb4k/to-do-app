import { API_URL } from "../config/config";

export const updateTaskContent = async (updatedTask, dispatch) => {
  try {
    const response = await fetch(`${API_URL}/tasks/update/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    dispatch({ type: "UPDATE_TASK", payload: updatedTask });
  } catch (error) {
    throw new Error(`Error updating task: ${error.message}`);
  }
};
