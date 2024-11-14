import {
  Button,
  Checkbox,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Grid, // Grid to arrange items side by side
} from "@mui/material";
import { Form, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useState, useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AUTH_URL } from "./../../../../constants/END_POINTS";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../../constants/VALIDATIONS";
import { AuthContext } from "../../../../Context/AuthContext";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface FormValue {
  email: string;
  password: string;
}

export default function Login() {
  let navigate = useNavigate();
  let { saveLoginData }: any = useContext(AuthContext);

  // State to manage "Remember Me" functionality
  const [rememberMe, setRememberMe] = useState(false);

  // Check if email and password are saved in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail && savedPassword) {
      setRememberMe(true);
      // Use saved values as default
      setValue("email", savedEmail);
      setValue("password", savedPassword);
    }
  }, []);

  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Used to set default value for form fields
  } = useForm<FormValue>({ defaultValues: { email: "", password: "" } }); //Form handling

  const onSubmit = async (data: FormValue) => {
    try {
      let response = await axios.post(AUTH_URL.login, data);
      toast.success(response.data.message);
      console.log(response.data);
      localStorage.setItem("token", response.data.data.accessToken);

      // Save user data if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("email", data.email);
        localStorage.setItem("password", data.password); // Save password
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      saveLoginData();
      navigate("/dashboard");
    } catch (error: any) {
      toast.warning(error.response.data.message);
    }
  };

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      {/* ------------form content--------- */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Stack>
            <Typography
              variant="h6"
              sx={{ color: "rgba(9, 9, 55, 0.6)" }} //gray color
            >
              Welcome back!
            </Typography>
            <Typography variant="h5">Login to your account</Typography>
          </Stack>
          {/* ------------------------ Email field--------------- */}

          <TextField
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
            placeholder="omarataa98@gmail.com"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email", EmailValidation)}
          />
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "#757575",
            }}
          >
            Email: omarataa98@gmail.com
          </Typography>

          {/* ------------------------ Password field--------------- */}
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            placeholder="Omar@123"
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
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "#757575",
            }}
          >
            Password: Omar@123
          </Typography>

          {/* ---------------- Grid for "Remember Me" and "Forget Password" */}
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography sx={{ padding: "1rem 0 ", fontSize: "0.8rem" }}>
                {" "}
                <Checkbox
                  {...label}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)} // Update rememberMe state
                  sx={{ padding: " 0 .5rem 0 0" }}
                />
                Remember Me
              </Typography>
            </Grid>
            <Grid item>
              <Link to={"/forget-pass"}>Forget password?</Link>
            </Grid>
          </Grid>

          {/* -----------------form buttons---------------- */}
          <Stack spacing={1}>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#EF6B4A" }}
            >
              Login
            </Button>

            <Button
              type="button"
              onClick={() => navigate("/register")}
              variant="outlined"
              sx={{
                color: "#6251DD",
                marginBottom: "3rem",
                borderColor: "#6251DD",
              }}
            >
              Register
            </Button>
          </Stack>
        </Stack>
      </Form>
    </>
  );
}
