import { Box, Stack } from "@mui/material";
// import React from "react";
import Grid from "@mui/material/Grid2";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo.png";

export default function AuthLayout() {
  let navigate = useNavigate();

  const handleLogo = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* ---------Left Section---------- */}
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Stack className="leftSection "></Stack>
        </Grid>

        {/* /-------------Right Section--------- */}

        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Stack className="rightSection">
            <Stack className="authOutlet">
              <Stack sx={{ width: "20%", margin: " 1rem auto" }}>
                <img src={logo} alt="Logo"  onClick={handleLogo} />
              </Stack>

              <Outlet />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
