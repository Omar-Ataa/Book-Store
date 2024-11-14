import { Phone, Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";

export default function TopNav() {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#3F2B8C",
          height: "3.5rem",
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 1.5rem",
          }}
        >
          {/* Phone Number */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Phone />
            <Typography
              variant="body1"
              sx={{ fontSize: "0.875rem", fontWeight: 500 }}
            >
              +91 8374902234
            </Typography>
          </Box>
          {/* Social Media Icons */}
          <Box sx={{ display: "flex", gap: "0.75rem" }}>
            <IconButton size="small">
              <Facebook fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <Instagram fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <LinkedIn fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <Twitter fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
