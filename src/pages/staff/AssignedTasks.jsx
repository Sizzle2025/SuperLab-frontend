import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  TextField,
  Alert,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [selectedFile, setSelectedFile] = useState({});

  const staffId = localStorage.getItem("staffId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/staff/${staffId}`);
      const pendingOnly = res.data.filter((task) => task.status !== "Completed");
      setTasks(pendingOnly);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("Failed to fetch tasks");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (taskId, status) => {
    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("status", status);
    if (selectedFile[taskId]) {
      formData.append("photo", selectedFile[taskId]);
    }

    try {
      await axios.patch(`http://localhost:5000/api/tasks/${taskId}/progress`, formData);
      setMessage(`Task marked as '${status}' successfully.`);
      setMessageType("success");
      fetchTasks();
    } catch (err) {
      console.error("Progress update failed:", err);
      setMessage("Task update failed");
      setMessageType("error");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (taskId, file) => {
    setSelectedFile((prev) => ({
      ...prev,
      [taskId]: file,
    }));
  };

  if (loading) {
    return (
      <Box p={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        My Assigned Tasks
      </Typography>

      {message && (
        <Alert severity={messageType} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Patient</strong></TableCell>
              <TableCell><strong>Task Type</strong></TableCell>
              <TableCell><strong>Sample Type</strong></TableCell>
              <TableCell><strong>Contact</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Photo</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.patientName}</TableCell>
                <TableCell>{task.taskType}</TableCell>
                <TableCell>{task.sampleType}</TableCell>
                <TableCell>{task.contactNumber}</TableCell>
                <TableCell>{task.patientAddress}</TableCell>
                <TableCell>
                  {task.patientLocation ? (
                    <Link href={task.patientLocation} target="_blank" rel="noopener">
                      View Map
                    </Link>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>{task.date?.substring(0, 10)}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <TextField
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    onChange={(e) => handleFileChange(task._id, e.target.files[0])}
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleAction(task._id, "reached")}
                      disabled={uploading}
                    >
                      Reached
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="warning"
                      onClick={() => handleAction(task._id, "collected")}
                      disabled={uploading}
                    >
                      Collected
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="success"
                      onClick={() => handleAction(task._id, "submitted")}
                      disabled={uploading}
                    >
                      Submit
                    </Button>
                    <Button
                      size="small"
                      onClick={() => navigate(`/staff/task/${task._id}`)}
                    >
                      View
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {tasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No pending tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewTask;
