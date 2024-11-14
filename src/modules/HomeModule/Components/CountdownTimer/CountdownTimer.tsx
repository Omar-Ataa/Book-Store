import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const calculateTimeLeft = () => {
    const targetDate: any = new Date("2025-12-31T23:59:59"); // حدد موعد انتهاء العرض
    const now: any = new Date();
    const difference = targetDate - now;

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // نظف المؤقت عند تفكيك الكومبوننت
  }, []);

  return (
    <Box display="flex" justifyContent="space-around" maxWidth="300px" mt={3}>
      {/* عداد المؤقت */}
      <Box textAlign="center">
        <Typography variant="h4" fontWeight="bold" color="#FF5733">
          {timeLeft.days}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          DAYS
        </Typography>
      </Box>
      <Box textAlign="center">
        <Typography variant="h4" fontWeight="bold" color="#FF5733">
          {timeLeft.hours}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          HOURS
        </Typography>
      </Box>
      <Box textAlign="center">
        <Typography variant="h4" fontWeight="bold" color="#FF5733">
          {timeLeft.minutes}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          MINS
        </Typography>
      </Box>
      <Box textAlign="center">
        <Typography variant="h4" fontWeight="bold" color="#FF5733">
          {timeLeft.seconds}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          SECS
        </Typography>
      </Box>
    </Box>
  );
}
