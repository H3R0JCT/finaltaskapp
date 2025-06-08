import { useState } from "react";
import TaskModal from "./modal";
import { API_BASE_URL } from "./api";

// Helper to get today's date in yyyy-mm-dd format
function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export default function AddTask({ onTaskAdded }: { onTaskAdded?: () => void }) {
  // State to control modal visibility
  const [show, setShow] = useState(false);
  // State for the task title input
  const [title, setTitle] = useState("");
  // State for the date input, defaulting to today
  const [date, setDate] = useState(getTodayDate());
  // State to indicate loading while submitting
  const [loading, setLoading] = useState(false);
  // State to hold any error messages
  const [error, setError] = useState<string | null>(null);

  // Function to open the modal and reset the date to today
  const handleShow = () => {
    setDate(getTodayDate()); // Always reset to today when opening
    setShow(true);
  };
  // Function to close the modal and reset form fields
  const handleClose = () => {
    setShow(false);
    setTitle("");
    setDate(getTodayDate());
    setError(null);
  };

  // Function to handle form submission for adding a new task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Send POST request to API to create a new task
      const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          date,
          complete: false,
        }),
      });
      if (!res.ok) throw new Error("Failed to add task");
      if (onTaskAdded) onTaskAdded(); // Refresh the task list if callback provided
      handleClose(); // Close the modal after successful add
    } catch (err: any) {
      setError(err.message || "Unknown error"); // Show error if request fails
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Return the modal component and the function to open it
  return {
    modal: (
      <TaskModal
        show={show} // Whether the modal is visible
        handleClose={handleClose} // Function to close the modal
        title={title} // Title input value
        date={date} // Date input value
        loading={loading} // Loading state for modal
        error={error} // Error message for modal
        setTitle={setTitle} // Function to update title
        setDate={setDate} // Function to update date
        handleSubmit={handleSubmit} // Function to handle form submit
        isEditMode={false} // Modal is in add mode
      />
    ),
    open: handleShow, // Function to open the modal
  };
}