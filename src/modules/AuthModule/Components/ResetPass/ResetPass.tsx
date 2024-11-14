import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Form } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_URL } from "../../../../constants/END_POINTS";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../../constants/VALIDATIONS";

interface FormValue {
  email: string;
  otp: string;
  password: string;
}

export default function ResetPass() {
  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: { email: "", otp: "", password: "" },
  });

  const onSubmit = async (data: FormValue) => {
    console.log(data);
    try {
      let response = await axios.post(AUTH_URL.resetPass, data);
      // console.log(response);

      toast.success(response.data.message);
      navigate("/login");
    } catch (error: any) {
      toast.warning(error.response.data.message);
      // console.log(error);
    }
  };
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <Stack spacing={3}>
        <Stack>
          <Typography
            variant="h6"
            sx={{ color: "rgba(9, 9, 55, 0.6)" }} //gray color
          >
            Welcome back!
          </Typography>
          <Typography variant="h5">Reset Your Password Now !</Typography>
        </Stack>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
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
              label="OTP"
              variant="outlined"
              type="text"
              error={!!errors.otp}
              helperText={errors.otp?.message}
              {...register("otp", {
                required: "OTP is Required",
              })}
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

            <Stack>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "#EF6B4A", marginBottom: "1rem" }}
              >
                Send
              </Button>
            </Stack>
          </Stack>
        </Form>
      </Stack>
    </>
  );
}
