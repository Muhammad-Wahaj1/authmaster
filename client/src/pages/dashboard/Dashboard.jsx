import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { LogoutApi } from "../../api/userAuth/invokeLogout.api";
import useUserStore from "../../context/userStore";
import { useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';

export default function Dashboard() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await LogoutApi(navigate);
  };

  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        px: 2,
      }}
    >
      <Typography variant="h4" component="h1">
        Welcome,{" "}
        <Box component="span" sx={{ color: "#850E35", textTransform: "uppercase" }}>
          {user?.username || "USER"}
        </Box>
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "#850E35",
        }}
      >
        <EmailIcon />
        <Typography variant="body1">{user?.email || "Not available"}</Typography>
      </Box>

      <Button
        variant="contained"
        size="small"
        color="error"
        onClick={handleLogout}
        sx={{ px: 4, py: 1, fontWeight: 600, fontSize: '1rem' }}
      >
        Logout
      </Button>
    </Box>
  );
}
