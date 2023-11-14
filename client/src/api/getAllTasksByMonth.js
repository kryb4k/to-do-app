import { API_URL } from "../common/config";

export async function getAllTasksByMonth(startDate, endDate) {
  const response = await fetch(
    `${API_URL}/tasks/calendar?startDate=${startDate}&endDate=${endDate}`
  );

  return response.json();
}

//2023-10-01T00:00:00Z&2023-12-01T00:00:00Z
//http://localhost:8080/tasks/calendar?startDate=2023-11-11T00:00:00Z&endDate=2023-11-22T00:00:00Z
