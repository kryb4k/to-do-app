import { API_URL } from "./../common/config";

export async function createTask(data) {
  data.isDone = false;
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
