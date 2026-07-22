const API_BASE_URL = "http://localhost:8080/api/notifications";

// Fetch all notifications for the logged-in user
export async function getNotifications(userId) {
  const response = await fetch(`${API_BASE_URL}/user/${userId}`);
  if (!response.ok) throw new Error("Failed to load notifications");
  return response.json();
}

// Fetch only unread notifications
export async function getUnreadNotifications(userId) {
  const response = await fetch(`${API_BASE_URL}/user/${userId}/unread`);
  if (!response.ok) throw new Error("Failed to load unread notifications");
  return response.json();
}

// Get unread count (for a bell icon badge elsewhere in the app)
export async function getUnreadCount(userId) {
  const response = await fetch(`${API_BASE_URL}/user/${userId}/unread-count`);
  if (!response.ok) throw new Error("Failed to load unread count");
  return response.json();
}

// Fetch a single notification by ID (for the details page)
export async function getNotificationById(notificationId) {
  const response = await fetch(`${API_BASE_URL}/${notificationId}`);
  if (!response.ok) throw new Error("Failed to load notification");
  return response.json();
}

// Mark a single notification as read
export async function markAsRead(notificationId) {
  const response = await fetch(`${API_BASE_URL}/${notificationId}/read`, {
    method: "PATCH",
  });
  if (!response.ok) throw new Error("Failed to mark notification as read");
  return response.json();
}

// Mark all notifications as read for a user
export async function markAllAsRead(userId) {
  const response = await fetch(`${API_BASE_URL}/user/${userId}/read-all`, {
    method: "PATCH",
  });
  if (!response.ok) throw new Error("Failed to mark all as read");
  // Backend returns no body for this endpoint, so there's nothing to parse.
}

// Delete a single notification
export async function deleteNotification(notificationId) {
  const response = await fetch(`${API_BASE_URL}/${notificationId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete notification");
  // Backend returns no body for this endpoint, so there's nothing to parse.
}