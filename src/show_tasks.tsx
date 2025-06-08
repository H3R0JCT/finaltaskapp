import type { Task } from "./types";
import { useState } from "react";
import { deleteTask, editTask } from "./button_functions";
import TaskModal from "./modal";

// Helper to get today's date in yyyy-mm-dd format
function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

// Reusable component to display a list of tasks with delete, edit, and complete functionality
export default function ShowTasks({
  tasks,
  onTaskDeleted,
  onTaskEdited,
}: {
  tasks: Task[];
  onTaskDeleted?: () => void;
  onTaskEdited?: () => void;
}) {
  // State for tracking which task is being deleted, edited, or completed
  const [deletingId, setDeletingId] = useState<number | null>(null); // ID of task being deleted
  const [editingId, setEditingId] = useState<number | null>(null);   // ID of task being edited
  const [completingId, setCompletingId] = useState<number | null>(null); // ID of task being completed

  // State for modal (edit) form
  const [showModal, setShowModal] = useState(false); // Whether the modal is visible
  const [modalTitle, setModalTitle] = useState(""); // Title field in modal
  const [modalDate, setModalDate] = useState(""); // Date field in modal
  const [modalTaskId, setModalTaskId] = useState<number | null>(null); // Task being edited
  const [modalLoading, setModalLoading] = useState(false); // Loading state for modal
  const [modalError, setModalError] = useState<string | null>(null); // Error message for modal
  const [isEditMode, setIsEditMode] = useState(false); // Whether modal is in edit mode
  const [modalComplete, setModalComplete] = useState(false); // Complete status in modal

  // Opens the modal and fills it with the selected task's data for editing
  const handleEditClick = (task: Task) => {
    setModalTaskId(task.id); // Set the ID of the task being edited
    setModalTitle(task.title); // Set the title in the modal
    setModalDate(task.date || getTodayDate()); // Autofill with today's date if empty
    setModalComplete(task.complete); // Set the complete status in the modal
    setIsEditMode(true); // Set modal to edit mode
    setShowModal(true); // Show the modal
    setModalError(null); // Clear any previous error
  };

  // Closes the modal and resets modal state
  const handleModalClose = () => {
    setShowModal(false); // Hide the modal
    setModalTaskId(null); // Reset task ID
    setModalTitle(""); // Reset title
    setModalDate(""); // Reset date
    setModalError(null); // Clear error
    setIsEditMode(false); // Exit edit mode
    setModalComplete(false); // Reset complete status
  };

  // When the complete checkbox is toggled in the modal, update date if checked
  const handleSetComplete = (checked: boolean) => {
    setModalComplete(checked); // Update complete status
    if (checked) {
      setModalDate(getTodayDate()); // Set date to today if marked complete
    }
  };

  // Handles submitting the modal form to update a task
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submit
    if (isEditMode && modalTaskId != null) {
      setModalLoading(true); // Show loading spinner
      setModalError(null); // Clear error
      await editTask(
        modalTaskId,
        { title: modalTitle, date: modalDate, complete: modalComplete }, // Updated fields
        setEditingId,
        () => {
          if (onTaskEdited) onTaskEdited(); // Refresh the API list after edit
          handleModalClose(); // Close the modal
        }
      );
      setModalLoading(false); // Hide loading spinner
    }
  };

  // Handles marking a task as complete (from the list)
  const handleComplete = async (task: Task) => {
    setCompletingId(task.id); // Set the ID of the task being completed
    await editTask(
      task.id,
      { complete: true }, // Only update complete status
      setEditingId,
      onTaskEdited || onTaskDeleted // Refresh list after completion
    );
    setCompletingId(null); // Reset completing ID
  };

  return (
    <>
      {/* Task List */}
      <ul>
        {tasks.map(task => (
          <li
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem"
            }}
          >
            {/* Task info: displays title, status, and date */}
            <span>
              <strong>{task.title}</strong>
              {" — "}
              {task.complete ? "✅ Complete" : "❌ Incomplete"}
              {" — "}
              {task.date ? new Date(task.date).toLocaleDateString() : ""}
            </span>
            {/* Action buttons for each task */}
            <div style={{ display: "flex", marginLeft: "auto", gap: "0.5rem" }}>
              {/* Edit button: opens modal */}
              <button
                className="btn btn-warning btn-sm"
                style={{ minWidth: "85px", minHeight: "36px" }}
                onClick={() => handleEditClick(task)}
                disabled={editingId === task.id}
              >
                Edit
              </button>
              {/* Complete button: only shown if not complete */}
              {!task.complete && (
                <button
                  className="btn btn-success btn-sm"
                  style={{ minWidth: "85px", minHeight: "36px" }}
                  onClick={() => handleComplete(task)}
                  disabled={completingId === task.id}
                >
                  {completingId === task.id ? "Completing..." : "Complete"}
                </button>
              )}
              {/* Delete button */}
              <button
                className="btn btn-danger btn-sm"
                style={{ minWidth: "85px", minHeight: "36px", marginRight: "1rem" }}
                onClick={() => deleteTask(task.id, setDeletingId, onTaskDeleted)}
                disabled={deletingId === task.id}
              >
                {deletingId === task.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Modal for editing a task */}
      <TaskModal
        show={showModal} // Whether modal is visible
        handleClose={handleModalClose} // Function to close modal
        title={modalTitle} // Title field value
        date={modalDate} // Date field value
        loading={modalLoading} // Loading state for modal
        error={modalError} // Error message for modal
        setTitle={setModalTitle} // Function to update title
        setDate={setModalDate} // Function to update date
        handleSubmit={handleModalSubmit} // Function to handle form submit
        isEditMode={isEditMode} // Whether modal is in edit mode
        complete={modalComplete} // Complete status
        setComplete={handleSetComplete} // Function to update complete status
      />
    </>
  );
}