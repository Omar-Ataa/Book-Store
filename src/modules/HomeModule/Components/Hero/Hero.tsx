import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import "./hero.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Typography, Button, Grid, useMediaQuery } from "@mui/material";

import { CartContext } from "../../../../Context/CartContext";

interface Book {
  auther: string;
  category: string;
  createdAt: string;
  description: string;
  image?: string;
  name: string;
  price: number;
  status: string;
  updatedAt: string;
}

export default function Hero() {
  const cartContext = useContext(CartContext);
  const books = cartContext ? cartContext.books.slice(0, 3) : [];
  let isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <div id="hero">
        <Swiper
          className="custom-swiper"
          navigation={{
            nextEl: ".swiper-button-next-custom", // تخصيص الزر التالي
            prevEl: ".swiper-button-prev-custom", // تخصيص الزر السابق
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Pagination]}
        >
          {books.map((book: Book, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  background:
                    "linear-gradient(79deg, #FFE5E5 8.52%, #F5FFFE 68.88%, #FFF 101.74%)",
                  // minHeight: "70vh",
                }}
                display={"flex"}
                alignItems="center"
                justifyContent="center"
              >
                <Grid container alignItems="center">
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      color: "var(--blue-color)",
                    }}
                    paddingX={{
                      xs: 6, // Less padding on smaller screens
                      md: 4, // More padding on medium and larger screens
                    }}
                  >
                    <Grid
                      sx={{
                        width: {
                          xs: "100%", // Full width on small screens
                          md: "80%", // 80% width on medium screens and up
                        },
                        paddingX: {
                          xs: 2, // Less padding on small screens
                          md: 6, // More padding on medium screens and up
                        },
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{ textTransform: "capitalize" }}
                        gutterBottom
                      >
                        {/* {book.name} */}
                        ipsum dolor si
                      </Typography>
                      <Typography paragraph>
                        {/* {book.description} */}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed eu feugiat amet, libero ipsum enim pharetra hac.
                        Urna commodo, lacus ut magna velit eleifend. Amet, quis
                        urna, a eu.
                      </Typography>
                      <Button
                        variant="outlined"
                        color="inherit"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: ".5rem",
                          py: ".5rem",
                        }}
                      >
                        <Typography variant="body2">Read More</Typography>
                        <ArrowRightAltIcon />
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      my={6}
                      sx={{
                        height: {
                          xs: "200px",
                          sm: "300px",
                          md: "400px",
                        },
                        maxHeight: "400px",
                      }}
                    >
                      <img
                        src={book.image || `/book1.png`}
                        alt={book.name}
                        loading="lazy"
                        style={{
                          width: "auto",
                          height: "100%",
                          maxHeight: "400px",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </SwiperSlide>
          ))}
          {/* أزرار التنقل المخصصة */}
          {!isMobile && (
            <>
              <div className="swiper-button-prev-custom">
                <ArrowRightAltIcon
                  sx={{
                    transform: "rotate(180deg)",
                    color: "#FF5733",
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="swiper-button-next-custom">
                <ArrowRightAltIcon
                  sx={{ color: "#FF5733", fontSize: "2rem" }}
                />
              </div>
            </>
          )}
        </Swiper>
      </div>
    </>
  );
}
