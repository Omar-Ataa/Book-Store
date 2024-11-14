import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props: any) {
  let { loginData }: any = useContext(AuthContext);

  if (localStorage.getItem("token") || loginData) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}
