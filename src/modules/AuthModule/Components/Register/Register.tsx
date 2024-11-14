import {
  Stack,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import { useForm } from "react-hook-form";
import { useNavigate, Form } from "react-router-dom";
import { toast } from "react-toastify";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { AUTH_URL } from "../../../../constants/END_POINTS";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../../constants/VALIDATIONS";

interface FormValue {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  role: string;
}

export default function Register() {
  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      role: "",
    },
  });

  const onSubmit = async (data: FormValue) => {
    console.log(data);
    try {
      let response = await axios.post(AUTH_URL.register, data);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error: any) {
      toast.warning(error.response.data.message);
      console.log(error);
    }
  };
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <Stack spacing={2}>
        <Stack>
          <Typography variant="h6" sx={{ color: "rgba(9, 9, 55, 0.6)" }}>
            Welcome back!
          </Typography>
          <Typography variant="h5">Reset Your Password Now !</Typography>
        </Stack>

        {/* ------------------form------------------- */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Box sx={{ width: "100%" }}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    type="text"
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                    {...register("first_name", {
                      required: "First Name is Required",
                    })}
                    fullWidth
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    type="text"
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                    {...register("last_name", {
                      required: "Last Name is Required",
                    })}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>

            <TextField
              id="outlined-basic"
              label="E-mail"
              variant="outlined"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email", EmailValidation)}
            />

            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"} // Toggle between text and password
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password", PasswordValidation)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="role"
                  {...register("role", {
                    required: "Role is Required",
                  })}
                >
                  <MenuItem value={"Customer"}>Customer</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* ------buttons-------- */}
            <Stack spacing={1}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#EF6B4A",
                  marginBottom: "1rem",
                }}
              >
                Register
              </Button>
              <Button
                // type="submit"
                variant="outlined"
                onClick={() => navigate("/login")}
                sx={{
                  color: "##6251DD",
                  marginBottom: "1rem",
                  borderColor: "#6251DD",
                }}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Form>
      </Stack>
    </>
  );
}
