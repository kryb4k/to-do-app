import { API_URL } from "../common/config";

export async function getAllTasks() {
  const response = await fetch(`${API_URL}/tasks`);
  return response.json();
}
