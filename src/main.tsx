import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import Swiper styles
import "swiper/swiper-bundle.css";

import "./index.css";
import AuthContextProvider from "./Context/AuthContext.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import CartContextProvider from "./Context/CartContext.tsx";
// إنشاء theme مخصص واستخدام خط Inter
const theme = createTheme({
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`, // جعل "Inter" هو الخط الافتراضي
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </StrictMode>
);
