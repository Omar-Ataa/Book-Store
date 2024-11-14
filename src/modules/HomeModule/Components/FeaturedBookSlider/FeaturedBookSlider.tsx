import { Box, Typography, Button, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import "./FeaturedBookSlider.css";

import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../../Context/CartContext";

interface Book {
  id: string;
  name: string;
  author: string;
  price: number;
  image: string;
  description: string;
}

export default function FeaturedBookSlider() {
  let navigate = useNavigate();
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    return null; // أو معالجة الخطأ
  }
  const { books } = cartContext;
  return (
    <Box
      id="featured"
      paddingY={10}
      sx={{
        backgroundImage: `linear-gradient(78deg, #fbeeee -27.34%, #f7fffe 89.92%)`,
      }}
    >
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
        {books.slice(0, 10).map((book: Book, index) => (
          <SwiperSlide key={index}>
            <Grid container alignItems="center" spacing={3}>
              {/* صورة الكتاب */}
              <Grid item xs={12} md={6} py={9}>
                <Box display="flex" justifyContent="center">
                  <Grid
                    sx={{
                      bgcolor: "white",
                    }}
                    padding={3}
                  >
                    <img
                      src={book.image}
                      alt={book.name}
                      style={{
                        width: "300px",
                        height: "450px",
                      }}
                    />
                  </Grid>
                </Box>
              </Grid>

              {/* تفاصيل الكتاب */}
              <Grid item xs={12} md={6} py={8}>
                <Box paddingX={7}>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color="var(--blue-color)"
                    gutterBottom
                  >
                    Featured Book
                  </Typography>

                  <Typography
                    variant="overline"
                    sx={{
                      color: "#7a7a7a",
                      fontSize: "14px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    By {book.author}
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color="var(--blue-color)"
                    gutterBottom
                    textTransform="capitalize"
                  >
                    {book.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginBottom: "16px" }}
                  >
                    {book.description}
                  </Typography>

                  <Typography
                    variant="h6"
                    color="#ED553B"
                    fontWeight="bold"
                    sx={{ marginBottom: "24px" }}
                  >
                    $ {book.price}
                  </Typography>

                  <Button
                    sx={{
                      padding: ".7rem 2rem",
                      fontSize: "16px",
                      color: "var(--blue-color)",
                      fontWeight: "400",

                      border: "1px solid var(--blue-color)",
                      textTransform: "uppercase",
                    }}
                    variant="outlined"
                    endIcon={<ArrowRightAltIcon />}
                    onClick={() => navigate(`/dashboard/book/${book.id}`)}
                  >
                    View More
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </SwiperSlide>
        ))}
        {/* أزرار التنقل المخصصة */}
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
          <ArrowRightAltIcon sx={{ color: "#FF5733", fontSize: "2rem" }} />
        </div>
      </Swiper>
    </Box>
  );
}
