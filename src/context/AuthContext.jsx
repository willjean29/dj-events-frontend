import { NEXT_URL } from "config";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    checkLoggendIn();
  }, []);
  // register user
  const register = async (user) => {
    try {
      const response = await axios.post(`${NEXT_URL}/api/register`, user);
      console.log(response);
      setUser(response.data.user);
      router.push("/account/dashboard");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
      setError(null);
    }
  };
  // login user
  const login = async ({ email, password }) => {
    console.log({ identifier: email, password });
    try {
      const response = await axios.post(`${NEXT_URL}/api/login`, {
        identifier: email,
        password,
      });
      console.log(response);
      setUser(response.data.user);
      router.replace("/account/dashboard");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
      setError(null);
    }
  };

  // logout user
  const logout = async () => {
    try {
      const response = await axios.post(`${NEXT_URL}/api/logout`);
      setUser(null);
      router.replace("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  // check if user user islogged input
  const checkLoggendIn = async () => {
    console.log("check");
    try {
      const response = await axios.get(`${NEXT_URL}/api/user`);
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login,
        logout,
        checkLoggendIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
