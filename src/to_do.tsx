import { useEffect, useState } from "react";
import ShowTasks from "./show_tasks";
import AddTask from "./add_button";
import { useFetchTasks } from "./fetch_tasks";
import type { Task } from "./types";

export default function TasksPage() {
  // State to hold the list of open tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);

  // Custom hook to fetch open tasks from the API
  const fetchTasks = useFetchTasks("open", setTasks, setLoading);

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  // Set up the Add Task modal and its open function, refreshing the list after adding
  const addTask = AddTask({ onTaskAdded: fetchTasks });
  const addTaskModal = addTask.modal; // The modal component for adding a task
  const openAddTaskModal = addTask.open; // Function to open the add task modal

  return (
    // Main container for the open tasks page
    <div>
      {/* Page title */}
      <h1>Open Tasks</h1>
      {/* Center the Add Task button */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        {/* Button to open the Add Task modal */}
        <button className="btn btn-primary" onClick={openAddTaskModal}>
          Add Task
        </button>
      </div>
      {/* Render the Add Task modal */}
      {addTaskModal}
      {/* Show loading text or the list of open tasks */}
      {loading ? (
        // Loading indicator
        <p>Loading tasks...</p>
      ) : (
        // ShowTasks component displays the list and handles actions
        <ShowTasks tasks={tasks} onTaskDeleted={fetchTasks} onTaskEdited={fetchTasks} />
      )}
    </div>
  );
}