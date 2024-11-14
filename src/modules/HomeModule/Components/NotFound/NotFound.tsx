import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        padding: "1rem",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "3rem", sm: "5rem", md: "6rem" }, // Responsive font sizes
          fontWeight: "bold",
        }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginBottom: "1.5rem",
          color: "#666",
          fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" }, // Responsive text
        }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{
          backgroundColor: "#1976d2",
          ":hover": { backgroundColor: "#115293" },
          padding: { xs: "0.5rem 1.5rem", sm: "0.75rem 2rem" }, // Responsive padding
          fontSize: { xs: "0.75rem", sm: "1rem" }, // Responsive button text
        }}
      >
        Go Back to Home
      </Button>
    </Box>
  );
}
