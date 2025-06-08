import { useEffect, useState } from "react";
import ShowTasks from "./show_tasks";
import { useFetchTasks } from "./fetch_tasks";
import type { Task } from "./types";

export default function CompletedPage() {
  // State to hold the list of completed tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);

  // Custom hook to fetch completed tasks from the API
  const fetchTasks = useFetchTasks("completed", setTasks, setLoading);

  // Fetch tasks when the component mounts or fetchTasks changes
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    // Container for the completed tasks page
    <div>
      {/* Page title */}
      <h1>Completed Tasks</h1>
      {/* Show loading text or the list of completed tasks */}
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