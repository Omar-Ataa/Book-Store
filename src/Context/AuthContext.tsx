import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export interface AuthContextType {
  loginData: any;
  error?: string | null;
  saveLoginData?: () => void;
}

export let AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider(props: any) {
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) saveLoginData();
  }, []);

  const saveLoginData = () => {
    let encodedToken: any = localStorage.getItem("token");
    let decodedToken: any = jwtDecode(encodedToken);
    setLoginData(decodedToken);
  };

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData }}>
      {props.children}
    </AuthContext.Provider>
  );
}
