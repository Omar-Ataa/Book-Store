import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import ChangePass from "./modules/AuthModule/Components/ChangePass/ChangePass";
import ForgetPass from "./modules/AuthModule/Components/ForgetPass/ForgetPass";
import Register from "./modules/AuthModule/Components/Register/Register";
import ResetPass from "./modules/AuthModule/Components/ResetPass/ResetPass";
import CartDetails from "./modules/CartModule/Components/Cart/CartDetails";
import Confirmation from "./modules/CartModule/Components/Confirmation/Confirmation";
import About from "./modules/HomeModule/Components/About/About";
import NotFound from "./modules/HomeModule/Components/NotFound/NotFound";
import ProductPage from "./modules/ListingPageModel/Components/ProductPage/ProductPage";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import ProtectedRoute from "./modules/Shared/components/ProtectedRoute/ProtectedRoute";
import Login from "./modules/AuthModule/Components/Login/Login";
import Home from "./modules/HomeModule/Components/Home/Home";
import BookDetails from "./modules/HomeModule/Components/BookDetails/BookDetails";
import NewReleaseBooks from "./modules/HomeModule/Components/NewReleaseBooks/NewReleaseBooks";




function App() {
  const stripe = loadStripe(
    "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
  );
  const routing = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout/>,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetpass", element: <ForgetPass /> },
        { path: "resetpssword", element: <ResetPass /> },
        { path: "changePass", element: <ChangePass /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout/>
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "cart", element: <CartDetails/> },
        { path: "books", element: <ProductPage /> },
        { path: "about", element: <About /> },
        { path: "new-release", element: <NewReleaseBooks /> },        
        { path: "book/:bookId", element: <BookDetails /> },
        { path: "confirmation", element: <Confirmation /> },
      ],
    },
  ]);
  return (
    <>
      <div>
        <ToastContainer />
        <Elements stripe={stripe}>
          <RouterProvider router={routing}></RouterProvider>
        </Elements>
      </div>
    </>
  );
}
export default App;
