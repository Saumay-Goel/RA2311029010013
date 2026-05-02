const API_URL = "http://20.207.122.201/evaluation-service/notifications";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzZzA2MjdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMDY2NSwiaWF0IjoxNzc3Njk5NzY1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNWM3ODA5YTEtZjdlNi00OGU3LWIwZDUtZmJiMjk5OTlhYmU5IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2F1bWF5IGdvZWwiLCJzdWIiOiIwNTFlZDU4ZC1iMzQ5LTQ1YjktOWFmMC0zNzU2NGI2NmIyNjMifSwiZW1haWwiOiJzZzA2MjdAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJzYXVtYXkgZ29lbCIsInJvbGxObyI6InJhMjMxMTAyOTAxMDAxMyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjA1MWVkNThkLWIzNDktNDViOS05YWYwLTM3NTY0YjY2YjI2MyIsImNsaWVudFNlY3JldCI6IkVzQXpLQUpXWGtNTXFuQ3cifQ.R4IizbQ3kaVKkGRR0oTndgevARXUljBC20bcTHngv4A";

const PRIORITY_WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function fetchAndSortNotifications() {
  try {
    console.log("Fetching notifications from API...\n");
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    const notifications = data.notifications;

    const sortedNotifications = notifications.sort((a, b) => {
      const weightA = PRIORITY_WEIGHTS[a.Type] || 0;
      const weightB = PRIORITY_WEIGHTS[b.Type] || 0;

      if (weightA !== weightB) {
        return weightB - weightA;
      }

      const timeA = new Date(a.Timestamp).getTime();
      const timeB = new Date(b.Timestamp).getTime();
      return timeB - timeA;
    });

    const top10 = sortedNotifications.slice(0, 10);

    console.log("=== TOP 10 PRIORITY NOTIFICATIONS ===");
    console.table(
      top10.map((n) => ({
        ID: n.ID.substring(0, 8) + "...",
        Type: n.Type,
        Message: n.Message,
        Timestamp: n.Timestamp,
      })),
    );
  } catch (error) {
    console.error("Error processing notifications:", error.message);
  }
}

fetchAndSortNotifications();
