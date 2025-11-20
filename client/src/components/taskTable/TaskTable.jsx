import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Box,Typography } from "@mui/material";

ModuleRegistry.registerModules([AllCommunityModule]);

export const TaskTable = ({rowData, loading}) => {


  const [colDefs] = useState([
    { field: "title", headerName: "Task Title", sortable: true, filter: true },
    { field: "status", headerName: "Status", sortable: true, filter: true },
    { field: "createdAt", headerName: "Created At", sortable: true },
    { field: "updatedAt", headerName: "Updated At", sortable: true },
  ]);

  

  return (
  <Box
    sx={{
      mt: 2,
    }}
  >
    <Box className="ag-theme-alpine" sx={{ height: 400, width: "85%" }}>
      {loading ? (
        <Typography align="center">Loading tasks...</Typography>
      ) : rowData.length === 0 ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>No task added</Typography>
        </Box>
      ) : (
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      )}
    </Box>
  </Box>
);
};
