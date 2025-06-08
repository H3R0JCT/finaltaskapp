import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { API_BASE_URL } from "./api";
import type { Task } from "./types";

function Counter() {
  // State to hold the count of incomplete tasks
  const [count, setCount] = useState(0);
  // State to track loading status
  const [loading, setLoading] = useState(true);

  // Fetch tasks from the API and count those with complete === false
  useEffect(() => {
    fetch(API_BASE_URL)
      .then((res) => res.json())
      .then((data: Task[]) => {
        if (Array.isArray(data)) {
          // Set count to the number of incomplete tasks
          setCount(data.filter((task) => task.complete === false).length);
        } else {
          setCount(0);
        }
        setLoading(false);
      })
      .catch(() => {
        setCount(0);
        setLoading(false);
      });
  }, []);

  return (
    // Bootstrap container to center content
    <Container className="text-center mt-5">
      <Row>
        <Col>
          {/* Title for the counter */}
          <h1>Open Tasks Counter</h1>
          {/* Center the count number using flex and justify-content */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Display the count or loading text */}
            <h1 style={{ textAlign: "center", margin: 0 }}>
              {loading ? "Loading..." : count}
            </h1>
          </div>
          <div className="mt-3">
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Counter;
