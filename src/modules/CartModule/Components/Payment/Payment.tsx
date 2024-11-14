import {
  useStripe,
  useElements,
  CardElement,
  AddressElement,
} from "@stripe/react-stripe-js";

import { Button, Typography, Box, Grid, Stack, Divider } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { FormEvent, useContext } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../../../../Context/CartContext";
import api, { CreateOrder } from "../../../../constants/END_POINTS";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  let navigate = useNavigate();
  // جلب بيانات السلة من الـ context
  const cartContext = useContext(CartContext);

  // التحقق من أن cartContext ليس null
  if (!cartContext) {
    return <Typography>Error: Cart context is not available.</Typography>;
  }

  const { cartId, getMyBasket } = cartContext;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const addressElement = elements.getElement(AddressElement);

    if (!cardElement || !addressElement) {
      return;
    }
    const address = await addressElement.getValue();
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      toast.error(error.message);
    } else {
      if (address.complete) {
        const id = cartId;
        const data = {
          token: token.id,
          delivery_address: {
            country: address.value.address.country,
            city: address.value.address.city,
            state: address.value.address.state,
            building: 1,
            street: "street",
            floor: 1,
            appartment: 1,
            mobile: address.value.phone,
            additional_info: "additional_info",
            location: {
              type: "Point",
              coordinates: [30.0444, 31.2357],
            },
          },
        };
        try {
          const response = await api.post(`${CreateOrder}/${id}`, data);
          // console.log(response);

          const orderId = response.data.data._id;
          const totalAmount = response.data.data.total;

          toast.success(response.data.message);

          navigate("/dashboard/confirmation", {
            state: { orderId, totalAmount },
          });
          getMyBasket();
        } catch (error) {
          // console.log(error);
        }
      } else {
        toast.error("Complete missing fields ");
      }
    }
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                padding: 3,
                marginTop: 6,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adding a soft shadow for depth
                borderRadius: 2, // Rounded corners for a clean look
                backgroundColor: "#f9f9f9", // Light background for a clean look
                ml: 2,
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
                Payment Info
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <CardElement />
            </Grid>
            <Divider sx={{ mb: 2 }} />
            <Grid
              item
              xs={12}
              sx={{
                padding: 3,
                marginTop: 3,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adding a soft shadow for depth
                borderRadius: 2, // Rounded corners for a clean look
                backgroundColor: "#f9f9f9", // Light background for a clean look
                ml: 2,
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
                Shipping Data
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <AddressElement
                options={{
                  mode: "shipping",
                  fields: {
                    phone: "always",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Stack width="100%" pt={6}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 2,
                backgroundColor: "#fa8072", // Custom color for the button
                color: "#fff",
                fontWeight: "bold",
                ":hover": {
                  backgroundColor: "#E53935", // Darker color on hover
                },
              }}
            >
              Proceed to Checkout
            </Button>
          </Stack>
        </form>
        <Button
          onClick={() => navigate("/confirmation")}
          variant="outlined"
          sx={{ color: "#fa8072", mt: 2, py: 1.5 }}
          fullWidth
        >
          Continue Shopping
        </Button>
      </Box>
    </>
  );
}
