import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import { useContext } from "react";

import "./NewReleas.css";
import { useNavigate } from "react-router-dom";

import ProductCard from "../../../ListingPageModel/Components/ProductCard/ProductCard";
import { CartContext } from "../../../../Context/CartContext";

interface Book {
  id: string;
  name: string;
  author: string;
  price: number;
  image: string;
}

export default function NewReleaseBooks() {
  let isMobile = useMediaQuery("(max-width:600px)");
  let navigate = useNavigate();
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    return null; // أو معالجة الخطأ
  }
  const { books } = cartContext;

  return (
    <Box
      id="NewRelease"
      sx={{ padding: isMobile ? 2 : 9, backgroundColor: "#FAF5EF" }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="overline"
          sx={{
            color: "#7a7a7a",
            fontSize: {
              xs: ".7rem",
              sm: ".9rem",
            },
            fontWeight: "500",
            textTransform: "uppercase",
          }}
        >
          SOME QUALITY ITEMS
        </Typography>
        <Box sx={{ position: "relative", textAlign: "center", mb: 4 }}>
          {/* الخط الأفقي */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "1px",
              backgroundColor: "#E0E0E0", // لون الخط
              zIndex: 1, // تأكد أن الخط تحت النص
            }}
          />

          {/* العنوان في المنتصف */}
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              position: "relative", // يضمن أن النص فوق الخط
              display: "inline-block", // لكي يكون النص في المنتصف بشكل صحيح
              padding: "0 16px", // لضمان وجود مسافة بين النص والخط
              fontSize: { xs: "20px", md: "48px" },
              textTransform: "capitalize",
              fontWeight: 600,
              color: "var(--blue-color)",
              backgroundColor: "#FAF5EF", // لإخفاء الخط خلف النص
              zIndex: 2, // النص فوق الخط
            }}
          >
            New Release Books
          </Typography>
        </Box>
      </Box>

      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1300: {
            slidesPerView: 5,
          },
          1600: {
            slidesPerView: 6,
          },
        }}
      >
        {books.slice(0, 10).map((book: Book, index) => (
          <SwiperSlide key={index}>
            {/* استخدام مكون ProductCard */}
            <ProductCard product={book} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        sx={{
          textAlign: {
            xs: "center",
            md: "right",
          },
          mt: 4,
        }}
      >
        <Button
          variant="text"
          endIcon={<ArrowRightAltIcon />}
          color="error"
          onClick={() => navigate("/dashboard/books")}
          sx={{
            fontWeight: "600",
            fontSize: "20px",
            textTransform: "capitalize",
            letterSpacing: "1.4px",
          }}
        >
          View All Products
        </Button>
      </Box>
    </Box>
  );
}