import { Box, Grid, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./BookDealSlider.css";
import CountdownTimer from "../CountdownTimer/CountdownTimer";

export default function BookDealSlider() {
  return (
    <Box sx={{ m: { xs: 2, md: 9 } }} id="BookDealSlider">
      <Box
        paddingY={{ xs: 5, md: 10 }}
        sx={{
          backgroundColor: "#FAF5EF",
          borderRadius: "20px",
        }}
      >
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
        >
          <SwiperSlide>
            <Grid container alignItems="center" spacing={3}>
              {/* Left Side - Text and Countdown */}
              <Grid item xs={12} md={6}>
                <Box paddingX={8}>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="var(--blue-color)"
                    gutterBottom
                    sx={{ fontSize: { xs: "20px", md: "32px" } }}
                  >
                    All books are 50% off now!
                  </Typography>

                  <Typography
                    variant="h5"
                    color="var(--blue-color)"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ fontSize: { xs: "18px", md: "28px" } }}
                  >
                    Don't miss such a deal!
                  </Typography>

                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ marginBottom: "16px", fontSize: { xs: "14px", md: "16px" } }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac.
                  </Typography>

                  {/* Countdown Timer */}
                  <CountdownTimer />
                </Box>
              </Grid>

              {/* Right Side - Book Image */}
              <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="center">
                  <img
                    src="/books.png"
                    alt="Book Deal"
                    style={{
                      width: "100%",
                      maxWidth: "400px",
                      height: "auto",
                      borderRadius: "20px",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </SwiperSlide>
        </Swiper>
      </Box>
    </Box>
  );
}
