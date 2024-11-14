// components/Cart.tsx

import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Divider,
  TextField,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"; // استيراد Dialog

import { useContext } from "react";
import { CartContext } from "../../../../Context/CartContext";
import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import TopSection from "../../../ListingPageModel/Components/TopSection/TopSection";
import { Product } from "../../../../constants/types";

import Payment from "../Payment/Payment";

export default function CartDetails() {
  const cartContext = useContext(CartContext);
  const isMobile = useMediaQuery("(max-width:600px)");

  // let navigate = useNavigate();
  if (!cartContext) {
    return <Typography>Cart is empty</Typography>;
  }

  const {
    loading,
    cartItems,
    books,
    removeFromCart,
    updateCartItemQuantity,
    confirmDelete,
    setConfirmDelete,
  } = cartContext;

  // فتح الـ Modal للحذف
  const handleOpenDeleteConfirm = (productId: string, productName: string) => {
    setConfirmDelete({ productId, productName });
  };
  const handleConfirmDelete = () => {
    if (confirmDelete) {
      removeFromCart(confirmDelete.productId);
      setConfirmDelete(null); // إغلاق الـ Modal بعد الحذف
    }
  };

  const handleClose = () => {
    setConfirmDelete(null); // إغلاق الـ Modal بدون حذف
  };

  // Function to calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item: any) => {
      const bookDetails = books.find((book) => book.id === item.book);
      if (!bookDetails) {
        // console.error(`Book not found for ID ${item.book}`);
        return total;
      }
      return total + bookDetails.price * item.quantity;
    }, 0);
  };
  if (loading) {
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
    <>
      <TopSection pageTitle="Shopping Cart" currentPath="Home" />
      <Box sx={{ padding: isMobile ? 2 : 8, paddingTop: 0 }}>
        <Grid container mt={4} spacing={isMobile ? 2 : 4}>
          {/* قائمة المنتجات */}
          <Grid item xs={12} md={8}>
            {!isMobile && (
              <Box
                sx={{
                  borderColor: "#ddd",
                  display: "flex",
                  border: 1,
                  padding: isMobile ? 2 : 3,
                  mx: 2,
                  px: isMobile ? 2 : 6,
                  mb: 4,
                  borderRadius: 2,
                  bgcolor: "#FF6F61",
                  color: "#fff",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // إضافة ظل خفيف لإبراز الجزء
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <Typography
                  width={isMobile ? "100%" : "50%"}
                  variant="h5"
                  sx={{
                    fontWeight: "bold", // Bold for the book title
                    fontSize: "1.2rem", // Slightly larger font size
                    textAlign: isMobile ? "center" : "left",
                  }}
                >
                  Book
                </Typography>
                <Box
                  display="flex"
                  justifyContent={isMobile ? "space-around" : "space-evenly"}
                  flexGrow={1}
                  sx={{
                    alignItems: "center",
                    flexDirection: isMobile ? "column" : "row",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "1rem",
                      textAlign: "center", // Center-align the text
                    }}
                  >
                    Quantity
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "1rem",
                      textAlign: "center", // Center-align the text
                    }}
                  >
                    Price
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "1rem",
                      textAlign: "center", // Center-align the text
                      color: "#F5F5F5", // Lighter text for Delete
                    }}
                  >
                    Delete
                  </Typography>
                </Box>
              </Box>
            )}
            <Grid
              rowSpacing={2}
              sx={{
                paddingX: 3,
                pt: 3,
                pb: 1,
                m: 3,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adding a soft shadow for depth
                borderRadius: 2, // Rounded corners for a clean look
                backgroundColor: "#f9f9f9",
              }}
            >
              {cartItems.length === 0 ? (
                <Typography
                  variant="h6"
                  color="textSecondary"
                  textAlign="center"
                >
                  Your cart is empty
                </Typography>
              ) : (
                cartItems.map((item: any, index) => {
                  const bookDetails = books.find(
                    (book: Product) => book.id === (item as any).book
                  );
                  if (!bookDetails) {
                    return (
                      <Typography key={index} color="error">
                        Error: Book not found for ID {item.book}
                      </Typography>
                    );
                  }
                  const itemSubtotal = bookDetails.price * item.quantity;
                  return isMobile ? (
                    <Card
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        mb: 2,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        bgcolor: "#fff",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid #ddd",
                        p: 2,
                      }}
                    >
                      {/* Image Section */}
                      <CardMedia
                        component="img"
                        image={bookDetails.image}
                        alt={bookDetails.name}
                        sx={{
                          width: "100%", // عرض كامل للصورة
                          height: "100%", // ارتفاع ثابت للصورة
                          objectFit: "cover", // تكبير الصورة لتناسب الكارت
                          borderRadius: "8px", // حواف مدورة للصورة
                          mb: 2, // مسافة بين الصورة والمحتوى
                        }}
                      />

                      {/* Content Section */}
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                        }}
                      >
                        {/* Book Info */}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            mb: 1,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            width: "100%",
                          }}
                        >
                          {bookDetails.name || "Book name"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#757575" }}>
                          By {bookDetails.author || "Unknown Author"}
                        </Typography>

                        {/* Quantity Controls Section */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 1,
                          }}
                        >
                          {/* Quantity Controls */}
                          <Box display="flex" alignItems="center">
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold", mr: 1 }}
                            >
                              Quantity:
                            </Typography>
                            <IconButton
                              onClick={() =>
                                updateCartItemQuantity(
                                  item.book,
                                  item.quantity - 1
                                )
                              }
                              sx={{
                                bgcolor: "#fa8072",
                                color: "#fff",
                                borderRadius: 1,
                                ":hover": { bgcolor: "#E53935" },
                                width: 30,
                                height: 30,
                              }}
                            >
                              <Remove />
                            </IconButton>
                            <TextField
                              size="small"
                              value={item.quantity}
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value);
                                if (newQuantity >= 1) {
                                  updateCartItemQuantity(
                                    item.book,
                                    newQuantity
                                  );
                                }
                              }}
                              sx={{
                                width: 50,
                                mx: 1,
                                textAlign: "center",
                              }}
                              inputProps={{
                                style: { textAlign: "center" },
                                min: 1,
                              }}
                            />
                            <IconButton
                              onClick={() =>
                                updateCartItemQuantity(
                                  item.book,
                                  item.quantity + 1
                                )
                              }
                              sx={{
                                bgcolor: "#fa8072",
                                color: "#fff",
                                borderRadius: 1,
                                ":hover": { bgcolor: "#394280" },
                                width: 30,
                                height: 30,
                              }}
                            >
                              <Add />
                            </IconButton>
                          </Box>
                        </Box>
                        {/* Price Section */}
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: "bold", color: "#333" }}
                        >
                          ${bookDetails.price.toFixed(2)}
                        </Typography>
                      </CardContent>

                      <Divider sx={{ my: 1 }} />

                      {/* Total Order Section */}
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        px={2}
                        py={1}
                      >
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          Total Order ({item.quantity}):
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          ${itemSubtotal.toFixed(2)}
                        </Typography>
                      </Box>

                      {/* Delete Button */}
                      <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                          color="error"
                          variant="outlined"
                          onClick={() =>
                            handleOpenDeleteConfirm(
                              item.book,
                              bookDetails?.name || "Product"
                            )
                          }
                        >
                          <DeleteOutline sx={{ mr: 1 }} />
                          Remove
                        </Button>
                      </Box>
                    </Card>
                  ) : (
                    <Card
                      key={bookDetails.id || index}
                      sx={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        mb: 2,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Added a soft shadow
                        bgcolor: "#fff", // Changed background to white
                        borderRadius: "8px", // Rounded the edges
                        overflow: "hidden", // Ensure image fits within the card
                        border: "1px solid #e0e0e0", // Border for better structure
                        p: isMobile ? 2 : 0,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={bookDetails.image}
                        alt={item.name}
                        sx={{
                          width: isMobile ? "100%" : 120,
                          height: 160, // Fixed height to ensure consistency in the layout
                          objectFit: "cover", // Ensures the image scales well
                          borderRight: isMobile ? "none" : "1px solid #e0e0e0",
                          mb: isMobile ? 2 : 0,
                        }}
                      />
                      <CardContent
                        sx={{
                          display: "flex",
                          justifyContent: "space-between", // Ensure even spacing between items
                          alignItems: "center",
                          flexGrow: 1,
                          px: isMobile ? 1 : 3,
                          gap: isMobile ? 2 : 0,
                          textAlign: "center",
                        }}
                      >
                        {/* Book Information Section */}
                        <Box
                          sx={{
                            flex: "1",
                            textAlign: isMobile ? "center" : "left",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            {bookDetails.name || "Book name"}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#757575" }}>
                            By {bookDetails.author || "Unknown Author"}
                          </Typography>
                        </Box>
                        {/* Quantity Controls Section */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center", // Center align elements
                            gap: 1, // Uniform gap between elements
                            minWidth: isMobile ? "100%" : "200px",
                            flexDirection: isMobile ? "column" : "row",
                          }}
                        >
                          <IconButton
                            onClick={() =>
                              updateCartItemQuantity(
                                item.book,
                                item.quantity - 1
                              )
                            }
                            sx={{
                              bgcolor: "#fa8072",
                              color: "#fff",
                              borderRadius: 1,
                              ":hover": {
                                bgcolor: "#E53935",
                              },
                              width: 36, // Uniform button size
                              height: 36,
                              mx: 1, // Ensure spacing between the button and input
                            }}
                          >
                            <Remove />
                          </IconButton>
                          <TextField
                            size="small"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value);
                              if (newQuantity >= 1) {
                                updateCartItemQuantity(item.book, newQuantity);
                              }
                            }}
                            sx={{
                              width: 60,
                              mx: 1,
                              textAlign: "center",
                            }}
                            inputProps={{
                              style: { textAlign: "center" },
                              min: 1,
                            }}
                          />
                          <IconButton
                            sx={{
                              bgcolor: "#fa8072",
                              color: "#fff",
                              borderRadius: 1,
                              ":hover": {
                                bgcolor: "#394280",
                              },
                              width: 36, // Uniform button size
                              height: 36,
                            }}
                            onClick={() =>
                              updateCartItemQuantity(
                                item.book,
                                item.quantity + 1
                              )
                            }
                          >
                            <Add />
                          </IconButton>
                        </Box>
                        {/* Price Section */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: isMobile ? "center" : "flex-start",
                            minWidth: isMobile ? "100%" : "150px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold", mb: 0.5 }}
                          >
                            Cost: $ {bookDetails.price}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#757575" }}>
                            Subtotal: ${itemSubtotal}
                          </Typography>
                        </Box>
                        {/* Delete Button */}
                        <Button
                          color="error"
                          onClick={() =>
                            handleOpenDeleteConfirm(
                              item.book,
                              bookDetails?.name || "Product"
                            )
                          }
                          sx={{
                            ml: 2,
                            ":hover": { bgcolor: "transparent" }, // Prevent background on hover
                          }}
                        >
                          <DeleteOutline
                            fontSize="large"
                            sx={{
                              color: "#cf4d4d",
                              transition: "0.3s ease-in-out",
                              ":hover": { color: "#D32F2F" }, // A little darker on hover
                            }}
                          />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </Grid>
          </Grid>

          {/* المجموع الكلي */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                padding: 3,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adding a soft shadow for depth
                borderRadius: 2, // Rounded corners for a clean look
                backgroundColor: "#f9f9f9", // Light background for a clean look
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#333",
                  mb: 2,
                }}
              >
                Shopping Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  Subtotal
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  ${calculateTotalPrice()}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  Shipping
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  $10.00 {/* Example shipping fee */}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  Taxes (VAT 5%)
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  ${(calculateTotalPrice() * 0.05).toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ color: "#333" }}>
                  Total
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#E53935" }}
                >
                  $
                  {(
                    calculateTotalPrice() +
                    10 +
                    calculateTotalPrice() * 0.05
                  ).toFixed(2)}
                </Typography>
              </Box>
            </Card>
            <Payment />
          </Grid>
        </Grid>
      </Box>

      {/* Dialog للتأكيد على الحذف */}
      <Dialog open={!!confirmDelete} onClose={handleClose}>
        <DialogTitle>{"Remove book ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete {confirmDelete?.productName} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
