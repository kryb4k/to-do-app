import { API_URL } from "../config/config";

export async function getAllTasks() {
  const response = await fetch(`${API_URL}/tasks`);
  return response.json();
}
