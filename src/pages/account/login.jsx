import Layout from "components/Layout";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import styles from "styles/AuthForm.module.css";
import Link from "next/link";
import { AuthContext } from "context/AuthContext";
import { toast } from "react-toastify";

function LoginPage() {
  const { login, error } = useContext(AuthContext);
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSunmit = (e) => {
    e.preventDefault();
    login(dataForm);
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error])
  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser />
          Log In
        </h1>
        <form onSubmit={handleSunmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <input type="submit" value="Login" className="btn" />
        </form>
        <p>
          Don´t have an account? <Link href="/account/register">Register</Link>
        </p>
      </div>
    </Layout>
  );
}

export default LoginPage;
