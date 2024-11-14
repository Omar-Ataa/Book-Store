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
import { PasswordValidation } from "../../../../constants/VALIDATIONS";
import { VisibilityOff, Visibility } from "@mui/icons-material";

interface FormValue {
  password: string;
  password_new: string;
}

export default function ChangePass() {
  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ defaultValues: { password: "", password_new: "" } });

  const onSubmit = async (data: FormValue) => {
    console.log(data);
    try {
      let response = await axios.post(AUTH_URL.changePass, data);
      // console.log(response);
      toast.success(response.data.message);
      navigate("/reset-pass");
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
          <Typography variant="h5">Forget Password !!</Typography>
        </Stack>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="Old Password"
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

            <TextField
              id="outlined-basic"
              label="New Password"
              variant="outlined"
              type={showPassword ? "text" : "password"} // Toggle between text and password
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password_new", PasswordValidation)}
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
                Save
              </Button>
            </Stack>
          </Stack>
        </Form>
      </Stack>
    </>
  );
}
