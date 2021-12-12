import Layout from "components/Layout";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import styles from "styles/AuthForm.module.css";
import { AuthContext } from "context/AuthContext";
import Link from "next/link";
function RegisterPage() {
  const { register } = useContext(AuthContext);
  const [dataForm, setDataForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSunmit = (e) => {
    e.preventDefault();
    if (dataForm.password !== dataForm.passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    register(dataForm);
  };
  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser />
          Register
        </h1>
        <form onSubmit={handleSunmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
            />
          </div>
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
          <div>
            <label htmlFor="passwordConfirm">Password Confirm</label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              onChange={handleChange}
            />
          </div>
          <input type="submit" value="Register" className="btn" />
        </form>
        <p>
          Already have an account? <Link href="/account/login">Login</Link>
        </p>
      </div>
    </Layout>
  );
}

export default RegisterPage;
