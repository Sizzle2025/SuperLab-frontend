import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  TextField,
  Alert,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const TaskDetail = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const res = await axios.get(`https://superlab-backend-ucpo.onrender.com/api/tasks/${taskId}`);
      setTask(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load task details");
      setMessageType("error");
      setLoading(false);
    }
  };

  const handleAction = async (status) => {
    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("status", status);
    if (file) formData.append("photo", file);

    try {
      await axios.patch(
        `https://superlab-backend-ucpo.onrender.com/api/tasks/${taskId}/progress`,
        formData
      );
      setMessage(`Marked as '${status}' successfully.`);
      setMessageType("success");
      fetchTask();
    } catch (err) {
      console.error(err);
      setMessage("Action failed");
      setMessageType("error");
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return (
      <Box p={3}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Task Details
      </Typography>

      {message && (
        <Alert severity={messageType} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell><strong>Task Type</strong></TableCell>
                  <TableCell>{task.taskType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Sample Type</strong></TableCell>
                  <TableCell>{task.sampleType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell>{task.status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Patient Name</strong></TableCell>
                  <TableCell>{task.patientName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Address</strong></TableCell>
                  <TableCell>{task.patientAddress}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Contact</strong></TableCell>
                  <TableCell>{task.contactNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Location</strong></TableCell>
                  <TableCell>
                    {task.patientLocation ? (
                      <Link href={task.patientLocation} target="_blank" rel="noopener">
                        Open Map
                      </Link>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Reached At</strong></TableCell>
                  <TableCell>
                    {task.reachedAt
                      ? new Date(task.reachedAt).toLocaleString()
                      : "Not marked"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Collected At</strong></TableCell>
                  <TableCell>
                    {task.sampleCollectedAt
                      ? new Date(task.sampleCollectedAt).toLocaleString()
                      : "Not marked"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Submitted At</strong></TableCell>
                  <TableCell>
                    {task.submittedToLabAt
                      ? new Date(task.submittedToLabAt).toLocaleString()
                      : "Not marked"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={(e) => setFile(e.target.files[0])}
              fullWidth
              size="small"
            />

            <Button
              variant="contained"
              onClick={() => handleAction("reached")}
              disabled={uploading}
            >
              Mark Reached
            </Button>

            <Button
              variant="contained"
              color="warning"
              onClick={() => handleAction("collected")}
              disabled={uploading}
            >
              Mark Collected
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={() => handleAction("submitted")}
              disabled={uploading}
            >
              Submit to Lab
            </Button>

            {task.photoProof && (
              <Box mt={2}>
                <Typography variant="subtitle1" mb={1}>
                  <strong>Uploaded Proof:</strong>
                </Typography>
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://superlab-backend-ucpo.onrender.com/uploads/${task.photoProof}`}
                  alt="Proof"
                  sx={{ borderRadius: 2, boxShadow: 2 }}
                />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskDetail;
