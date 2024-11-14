import { Button } from "@mui/material";
import { COLORS } from "../../../../constants/shearValues";

interface Book {
  id: string;
  name: string;
  author: string;
  price: number;
  image: string;
}

interface AddToCartButtonProps {
  book: Book;
  handleAddToCart: (book: Book) => void;
}

export default function AddToCartButton({
  book,
  handleAddToCart,
}: AddToCartButtonProps) {
  return (
    <Button
      onClick={() => handleAddToCart(book)}
      sx={{
        bgcolor: COLORS.blue,
        transition: "ease-in-out 0.2s",
        textTransform: "uppercase",
        color: "white",
        fontWeight: "light",
        fontSize: "1rem",
        padding: "10px 0",
        borderRadius: "0",
        ":hover": {
          bgcolor: COLORS.lightBlue,
        },
      }}
    >
      ADD TO CART
    </Button>
  );
}
