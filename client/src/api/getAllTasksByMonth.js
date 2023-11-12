import { API_URL } from "../common/config";

export async function getAllTasksByMonth(month) {
  const response = await fetch(`${API_URL}/tasks/calendar?month=${month}`);
  return response.json();
}
//http://localhost:8080/tasks/calendar?month=2023-12
