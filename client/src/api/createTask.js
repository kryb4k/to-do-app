import { API_URL } from "./../common/config";

export const createTask = async (data, dispatch) => {
  data.isDone = false;

  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    const createdTask = await response.json();

    dispatch({ type: "CREATE_TASK", payload: createdTask });

    return createdTask;
  } catch (error) {
    throw new Error(`Error creating task: ${error.message}`);
  }
};
