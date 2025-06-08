import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type TaskModalProps = {
  show: boolean; // Whether the modal is visible
  handleClose: () => void; // Function to close the modal
  title: string; // Task title value
  date: string; // Task date value
  loading: boolean; // Loading state for modal actions
  error: string | null; // Error message to display
  setTitle: (title: string) => void; // Function to update title
  setDate: (date: string) => void; // Function to update date
  handleSubmit: (e: React.FormEvent) => void; // Function to handle form submit
  isEditMode?: boolean; // Whether modal is in edit mode
  complete?: boolean; // Complete status (for edit mode)
  setComplete?: (complete: boolean) => void; // Function to update complete status
};

export default function TaskModal({
  show,
  handleClose,
  title,
  date,
  loading,
  error,
  setTitle,
  setDate,
  handleSubmit,
  isEditMode = false,
  complete,
  setComplete,
}: TaskModalProps) {
  return (
    // Modal dialog for adding or editing a task
    <Modal show={show} onHide={handleClose}>
      {/* Form for task input */}
      <form onSubmit={handleSubmit}>
        {/* Modal header with close button and title */}
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Task" : "Add a New Task"}</Modal.Title>
        </Modal.Header>
        {/* Modal body with form fields */}
        <Modal.Body>
          {/* Title input field */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>
          {/* Date input field */}
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              className="form-control"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {/* Checkbox for complete status in edit mode */}
          {isEditMode && typeof complete === "boolean" && setComplete && (
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="completeCheckbox"
                checked={complete}
                onChange={(e) => setComplete(e.target.checked)}
                disabled={loading}
              />
              <label className="form-check-label" htmlFor="completeCheckbox">
                Mark as Complete
              </label>
            </div>
          )}
          {/* Error message display */}
          {error && <div className="text-danger">{error}</div>}
        </Modal.Body>
        {/* Modal footer with Cancel and Save/Add buttons */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={loading || !title || !date}
          >
            {loading ? (isEditMode ? "Saving..." : "Adding...") : isEditMode ? "Save" : "Add Task"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}