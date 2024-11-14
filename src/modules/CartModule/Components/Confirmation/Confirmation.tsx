import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Confirmation() {
  const navigate = useNavigate();
  let location = useLocation();
  let { orderId, totalAmount } = location.state || {};

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
        bgcolor: "#f9f9f9",
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          borderRadius: 3,
          padding: 4,
        }}
      >
        <CheckCircleIcon sx={{ color: "green", fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Order Confirmed!
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Your order has been placed successfully. Thank you for shopping with
          us!
        </Typography>
        <Divider sx={{ my: 3 }} />
        <CardContent>
          <Typography variant="h6">Order Number:</Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {orderId ? `${orderId}` : "N/A"}
          </Typography>
          <Typography variant="h6">Total Amount:</Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {totalAmount ? `$${totalAmount}` : "N/A"}
          </Typography>
        </CardContent>
        <Divider sx={{ my: 3 }} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
          onClick={() => navigate("/dashboard")}
        >
          Back to Home
        </Button>
      </Card>
    </Box>
  );
}
