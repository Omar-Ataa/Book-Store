import { Box, Breadcrumbs, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface TopSectionProps {
  currentPath: string;
  pageTitle: string;
}

export default function TopSection({
  currentPath,
  pageTitle,
}: TopSectionProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: 2,
        backgroundImage: "linear-gradient(83deg, #FFE5E5 0%, #F5FFFE 113.52%)",
        padding: "1rem",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb" separator="/">
        {/* Current Path */}
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to={`../${currentPath}`}
          sx={{ fontSize: "1.2rem", color: "#393280" }}
        >
          {currentPath}
        </Link>

        {/* Page Title */}
        <Typography
          color="textPrimary"
          sx={{ fontSize: "1.2rem", color: "#393280" }}
        >
          {pageTitle}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
}
