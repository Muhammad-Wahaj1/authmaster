import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";

import { updateTasks } from "../../api/tasks/invokeUpdateTask.api";
import { deleteTasks } from "../../api/tasks/invokeDeleteTask.api";
import { removeTaskLocal, updateTaskLocal } from "../../../../server/redux/slices/taskSlice";



ModuleRegistry.registerModules([AllCommunityModule]);

export const TaskTable = ({ rowData, loading }) => {
  const dispatch = useDispatch();

  const handleEdit = async (task) => {
    const newTitle = prompt("Enter new title", task.title);
    if (!newTitle || !newTitle.trim()) return;

    const updated = await updateTasks(task.id, { title: newTitle });

    dispatch(updateTaskLocal(updated));
  };

  const handleComplete = async (taskId) => {
    const updated = await updateTasks(taskId, { status: "completed" });

    dispatch(updateTaskLocal(updated));
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    await deleteTasks(taskId);

    dispatch(removeTaskLocal(taskId));
  };

  const [colDefs] = useState([
    { field: "title", headerName: "Task Title", sortable: true, filter: true },
    { field: "status", headerName: "Status", sortable: true, filter: true },
    { field: "createdAt", headerName: "Created At", sortable: true },
    { field: "updatedAt", headerName: "Updated At", sortable: true },
    {
      headerName: "Actions",
      field: "actions",
      width: 150,
      cellRenderer: (params) => {
        const { data } = params;

        return (
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
            <Tooltip title="Edit Task">
              <IconButton
                size="small"
                onClick={() => handleEdit(data)}
                sx={{ color: "#1976d2" }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title={data.status === "completed" ? "Already Completed" : "Mark as Complete"}>
              <span>
                <IconButton
                  size="small"
                  onClick={() => handleComplete(data.id)}
                  sx={{ color: "green" }}
                  disabled={data.status === "completed"}
                >
                  <CheckCircleIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Delete Task">
              <IconButton
                size="small"
                onClick={() => handleDelete(data.id)}
                sx={{ color: "red" }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading tasks...</p>
      ) : rowData.length === 0 ? (
        <p style={{ textAlign: "center" }}>No task added</p>
      ) : (
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      )}
    </div>
  );
};
