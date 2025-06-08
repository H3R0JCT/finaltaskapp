import { API_BASE_URL } from "./api";

// Handles deleting a task from the API
export async function deleteTask(
  id: number, // ID of the task to delete
  setDeletingId: (id: number | null) => void, // Function to set the deleting state
  onTaskDeleted?: () => void // Optional callback to run after deletion
) {
  setDeletingId(id); // Set the deleting state to the current task ID
  await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE", // Use DELETE HTTP method
  });
  setDeletingId(null); // Reset the deleting state
  if (onTaskDeleted) onTaskDeleted(); // Call the callback if provided
}

// Handles editing a task in the API
export async function editTask(
  id: number, // ID of the task to edit
  updatedFields: { title?: string; date?: string; complete?: boolean }, // Fields to update
  setEditingId: (id: number | null) => void, // Function to set the editing state
  onTaskEdited?: () => void // Optional callback to run after editing
) {
  setEditingId(id); // Set the editing state to the current task ID
  await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT", // Use PUT HTTP method
    headers: { "Content-Type": "application/json" }, // Set content type to JSON
    body: JSON.stringify(updatedFields), // Send updated fields as JSON
  });
  setEditingId(null); // Reset the editing state
  if (onTaskEdited) onTaskEdited(); // Call the callback if provided
}
