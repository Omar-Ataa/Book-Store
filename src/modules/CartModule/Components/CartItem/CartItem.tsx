import {
  Box,
  Grid,
  Typography,
  CardMedia,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function CartItem({ item, onQuantityChange, onRemove }:any) {
  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: 2,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        mb: 3,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* رقم المنتج */}
        <Grid item xs={1}>
          <Typography variant="body1" fontWeight="bold" color="primary">
            {item.num}
          </Typography>
        </Grid>

        {/* صورة الكتاب */}
        <Grid item xs={2}>
          <CardMedia
            component="img"
            image={item.image}
            alt={item.name}
            sx={{ width: 80, height: 120, borderRadius: 1 }}
          />
        </Grid>

        {/* اسم الكتاب */}
        <Grid item xs={3}>
          <Typography variant="body1" fontWeight="bold">
            {item.name}
          </Typography>
        </Grid>

        {/* التحكم بالكمية */}
        <Grid item xs={2}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            >
              -
            </Button>
            <Typography variant="body1" mx={2}>
              {item.quantity}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </Box>
        </Grid>

        {/* تكلفة المنتج */}
        <Grid item xs={2}>
          <Typography variant="body1">{item.price} AED</Typography>
        </Grid>

        {/* المجموع الفرعي */}
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold">
            {item.price * item.quantity} AED
          </Typography>
        </Grid>

        {/* زر الحذف */}
        <Grid item xs={1}>
          <IconButton onClick={() => onRemove(item.id)}>
            <DeleteOutlineIcon color="error" />
          </IconButton>
        </Grid>
      </Grid>

      {/* خط فاصل */}
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
