import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useContext } from "react";

import { CartContext } from "../../../../Context/CartContext";
import { useNavigate } from "react-router-dom";
interface category {
  _id: string;
  title: string;
  image: string;
}

export default function CategoriesSwiper() {
  const isMobile = useMediaQuery("(max-width:600px)");
  let cartContext = useContext(CartContext);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/dashboard/books?category=${categoryId}`); // توجيه إلى صفحة المنتجات وتمرير الفئة
  };

  return (
    <div>
      <Box sx={{ padding: !isMobile ? 6 : 2, fontFamily: "inter" }}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 4 }}
        >
          <Grid item>
            <Box>
              <Grid display="flex" alignItems="center" gap="1rem">
                <Typography
                  // variant="overline"
                  sx={{
                    width: isMobile ? "23px" : "33px",
                    height: "2px",
                    background: "var(--orange-color)",
                  }}
                ></Typography>
                <Typography
                  variant="body1"
                  fontWeight="blod"
                  color="var(--orange-color)"
                  fontSize={isMobile ? 14 : 18}
                >
                  Categories
                </Typography>
              </Grid>
              <Typography
                fontSize={isMobile ? 20 : 30}
                variant="h4"
                fontWeight="bold"
                color="secondary"
              >
                Explore our Top Categories
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              marginY: {
                xs: 5,
              },
              textAlign: "center",
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                className="swiper-button-prev-custom"
                aria-label="previous"
                sx={{
                  border: "1px solid var(--lightGray) ",
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton
                className="swiper-button-next-custom"
                aria-label="next"
                sx={{
                  ml: 2,
                  bgcolor: "#ff5733",
                  color: "white",
                  transition: "ease-in-out .2s",
                  ":hover": {
                    bgcolor: "var(gray)",
                    color: "var(--gary)",
                  },
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        {/* Swiper */}
        <Swiper
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          modules={[Navigation]}
          spaceBetween={40}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1600: {
              slidesPerView: 5,
            },
          }}
        >
          {cartContext?.categories.map((cate: category, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  },
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
                onClick={() => handleCategoryClick(cate._id)}
              >
                <img
                  src={cate.image}
                  alt="Higher Education"
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                  }}
                />
                <Typography
                  variant="subtitle1"
                  fontWeight="600"
                  color="#393280"
                  mt={2}
                  textTransform="capitalize"
                  fontSize="1rem"
                >
                  {cate.title}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        <Grid
          item
          sx={{
            marginY: {
              xs: 5,
            },
            textAlign: "center",
            display: {
              xs: "flex",
              md: "none",
            },
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              className="swiper-button-prev-custom"
              aria-label="previous"
              sx={{
                border: "1px solid var(--lightGray) ",
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              className="swiper-button-next-custom"
              aria-label="next"
              sx={{
                ml: 2,
                bgcolor: "#ff5733",
                color: "white",
                transition: "ease-in-out .2s",
                ":hover": {
                  bgcolor: "var(gray)",
                  color: "var(--gary)",
                },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Grid>
        {/* الزر للعرض المزيد */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
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
          >
            View More
          </Button>
        </Box>
      </Box>
    </div>
  );
}
