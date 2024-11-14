import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

export default function NewsletterSection() {
  return (
    <Box sx={{ px: { xs: 3, md: 9 }, pb: 10, bgcolor: "#FCEBEA" }}>
      <Box
        sx={{
          backgroundColor: "#ED553B",
          paddingY: { xs: 5, md: 9 },
          textAlign: "center",
          borderRadius: "0 0 8px 8px ",
          position: "relative",
          overflow: "visible",
          color: "white",
        }}
      >
        {/* Section Title */}
        <Typography
          variant="h3"
          fontWeight="500"
          gutterBottom
          sx={{
            fontSize: { xs: "24px", md: "34px" },
          }}
        >
          Subscibe to Our Newsletter
        </Typography>

        {/* Subtitle */}
        <Typography variant="body1" sx={{ marginBottom: 4, color: "#FFEDED" }}>
          Sed eu feugiat amet, libero ipsum enim pharetra hac dolor sit amet,
          consectetur. Elit adipiscing enim pharetra hac.
        </Typography>

        {/* Input Field and Subscribe Button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            margin: "0 auto",
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: 1,
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
            position: "absolute",
            bottom: { xs: "-100px", md: "-30px" },
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <TextField
            placeholder="omarataa98@gmail.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: 1,
              width: { xs: "100%", sm: "auto" },
              "& .MuiOutlinedInput-root": {
                borderRadius: { xs: "5px", sm: "5px 0 0 5px" },
                marginBottom: { xs: 2, sm: 0 },
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#FF5733",
              color: "white",
              paddingX: 3,
              paddingY: { xs: 1.5, sm: 2 },
              textTransform: "uppercase",
              fontWeight: "400",
              borderRadius: { xs: "5px", sm: "0 8px 8px 0" },
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                bgcolor: "#E44A20",
              },
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
