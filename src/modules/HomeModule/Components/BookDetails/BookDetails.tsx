import { Box, Button, Grid, Typography } from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { GetAllBooks } from "../../../../constants/END_POINTS";
import { toast } from "react-toastify";
import { ShoppingCart } from "@mui/icons-material";
import { CartContext } from "../../../../Context/CartContext";

interface Book {
  id: string;
  name: string;
  auther?: string;
  author?: string;
  price: number;
  description: string;
  image: string;
}

export default function BookDetails() {
  const [book, setBook] = useState<Book | undefined>(undefined);

  const { bookId } = useParams();
  // الحصول على الـ CartContext
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    console.error(
      "CartContext is null. Make sure CartContextProvider is used."
    );
    return null;
  }

  const { cartItems, addToCart } = cartContext;
  // دالة للتحقق إذا كان الكتاب موجود بالفعل في السلة
  const isBookInCart = (bookId: string) => {
    return cartItems.some((item) => item.book === bookId);
  };
  // دالة لإضافة الكتاب إلى السلة
  const handleAddToCart = () => {
    if (book) {
      if (isBookInCart(book.id)) {
        toast.info(`${book.name} is already in your cart.`);
        return;
      }
      addToCart({ ...book });
      toast.success(`${book.name} added to cart!`);
    }
  };

  let fetchBookDetails = async () => {
    try {
      const response = await api.get(`${GetAllBooks}/${bookId}`);
      // Map the response to rename `_id` to `id`
      const fetchedBook = {
        ...response.data,
        id: response.data._id, // Rename _id to id
      };
      setBook(fetchedBook);
    } catch (error: any) {
      console.error("Error fetching book details", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [bookId]);

  if (!book) {
    return (
      <Box py={10} textAlign={"center"}>
        <i
          style={{ color: "#393280" }}
          className="fas fa-spinner fa-pulse fa-9x "
        ></i>
        <Typography
          color="var(--blue-color)"
          variant="h2"
          py={6}
          sx={{ mt: 2 }}
        >
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ paddingY: 8 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Book Image */}
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
            <img
              src={book.image || "/newreles2.png"}
              alt={book.name || "Book Cover"}
              style={{
                width: "100%",
                maxWidth: "300px", // Slightly reduced max width for a cleaner look
                height: "auto",
                borderRadius: "12px", // Smooth corners
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", // Enhanced shadow for depth
                objectFit: "cover", // Ensures the image fills the container neatly
              }}
            />
          </Box>
        </Grid>

        {/* Book? Details */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant="h4"
              color="var(--blue-color)"
              fontWeight="bold"
              gutterBottom
            >
              Book Details
            </Typography>
            <Box
              sx={{
                width: "60px",
                height: "2px",
                backgroundColor: "var(--orange-color)",
                my: "1rem",
              }}
            />
            <Typography
              variant="overline"
              sx={{
                color: "#7a7a7a",
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              By {book?.auther ? book.auther : book?.author || "Author Unknown"}
            </Typography>

            <Typography
              variant="h5"
              fontWeight="bold"
              color="var(--blue-color)"
              gutterBottom
            >
              {book?.name || "Birds gonna be happy"}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginBottom: "16px" }}
            >
              {book?.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac."}
            </Typography>

            <Typography variant="h6" color="error" fontWeight="bold">
              $ {book?.price || "45.00"}
            </Typography>
            <Button
              endIcon={<ShoppingCart />}
              variant="outlined"
              onClick={handleAddToCart}
              sx={{
                mt: 4,
                paddingX: 4,
                paddingY: 1.5,
                textTransform: "uppercase",
                color: "#173F5F",
                borderColor: "#173F5F",
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
