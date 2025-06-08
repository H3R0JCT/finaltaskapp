import { useCallback } from "react";
import { API_BASE_URL } from "./api";
import type { Task } from "./types";

// Custom hook to fetch open or completed tasks based on the filter
export function useFetchTasks(
  filter: "open" | "completed", // Filter type: "open" for incomplete, "completed" for complete
  setTasks: (tasks: Task[]) => void, // Function to update the tasks state
  setLoading: (loading: boolean) => void // Function to update the loading state
) {
  // useCallback returns a memoized fetch function that only changes if dependencies change
  return useCallback(() => {
    setLoading(true); // Set loading state to true before fetching
    fetch(API_BASE_URL) // Fetch all tasks from the API
      .then(res => res.json()) // Parse response as JSON
      .then(data => {
        if (Array.isArray(data)) {
          // Filter tasks based on the filter argument and update state
          setTasks(
            filter === "open"
              ? data.filter((task) => task.complete === false) // Only incomplete tasks
              : data.filter((task) => task.complete) // Only completed tasks
          );
        } else {
          setTasks([]); // If data is not an array, set tasks to empty
        }
        setLoading(false); // Set loading state to false after fetching
      })
      .catch(() => setLoading(false)); // On error, set loading state to false
  }, [filter, setTasks, setLoading]);
}