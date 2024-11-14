// components/ProductCard.tsx
import { Typography, Button, Box, Grid } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../../Context/CartContext";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    author: string;
    price: number;
    image: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    console.error(
      "CartContext is null. Make sure CartContextProvider is used."
    );
    return null;
  }

  const { addToCart } = cartContext;
  const handleAddToCart = () => {
    addToCart({ ...product });
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 2,
          borderRadius: 1,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          position: "relative",
          "&:hover .add-to-cart-btn": {
            opacity: 1,
            visibility: "visible",
          },
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
          }}
        />
        <Grid
          display={"flex"}
          flexDirection={"column"}
          className="add-to-cart-btn"
          sx={{
            position: "absolute",
            bottom: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: {
              xs: 1,
              md: 0,
            },
            visibility: {
              xs: "visible",
              md: "hidden",
            },
            transition: "ease-in-out 0.2s",
            width: "70%",
            textTransform: "uppercase",
          }}
        >
          <Button
            onClick={() => navigate(`/dashboard/book/${product.id}`)}
            sx={{
              bgcolor: "var(--orange-color)",
              transition: "ease-in-out 0.2s",
              textTransform: "uppercase",
              color: "white",
              fontWeight: "light",
              marginBottom: "16px",
              padding: "10px 0",
              borderRadius: "10px !important",
              ":hover": {
                bgcolor: "#C24029",
              },
              fontSize: {
                xs: "10px",
                md: "16px",
              },
            }}
          >
            View Details
          </Button>
          <Button
            onClick={handleAddToCart}
            variant="contained"
            sx={{
              bgcolor: "var(--blue-color)",
              transition: "ease-in-out 0.2s",
              textTransform: "uppercase",
              color: "white",
              fontWeight: "light",
              fontSize: "1rem",
              padding: "10px 0",
              borderRadius: "10px !important", 
              ":hover": {
                bgcolor: "#1D156F",
              },
            }}
          >
            <AddShoppingCartIcon />
          </Button>
        </Grid>
      </Box>

      <Grid textAlign="center" my={2}>
        <Typography
          variant="h5"
          color="var(--blue-color)"
          fontSize="22px"
          textTransform="capitalize"
          sx={{
            xs: "16px",
            md: "22px",
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="#888"
          sx={{
            mb: 1,
            fontSize: "14px",
            textTransform: "capitalize",
            fontWeight: "400",
          }}
        >
          {product.author || "Unknown Author"}
        </Typography>
        <Typography variant="body2" color="error">
          $ {product.price}
        </Typography>
      </Grid>
    </Box>
  );
}
