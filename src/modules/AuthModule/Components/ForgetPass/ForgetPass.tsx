import { Stack, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_URL } from "../../../../constants/END_POINTS";
import { EmailValidation } from "../../../../constants/VALIDATIONS";

interface FormValue {
  email: string;
}

export default function ForgetPass() {
  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ defaultValues: { email: "" } });

  const onSubmit = async (data: FormValue) => {
    console.log(data);
    try {
      let response = await axios.post(AUTH_URL.forgetPass, data);
      // console.log(response);
      toast.success(response.data.message);
      navigate("/reset-pass");
    } catch (error: any) {
      toast.warning(error.response.data.message);
      // console.log(error);
    }
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
          <Typography variant="h5">Forgot Password !!</Typography>
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
