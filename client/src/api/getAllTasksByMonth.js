import { API_URL } from "../common/config";

export async function getAllTasksByMonth(startDate, endDate) {
  const response = await fetch(
    `${API_URL}/tasks/calendar?startDate=${startDate}&endDate=${endDate}`
  );

  return response.json();
}
