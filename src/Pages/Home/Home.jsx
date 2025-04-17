import React, { useState } from "react";
import styles from "./Home.module.css";
import { Login } from "./Components/Login";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    //TODO
    navigate("/projects");
  };
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeLeft}>
        <div className={styles.waveOverlay} />
        <div className={styles.leftContent}>
          <img
            src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744799828/ques/QuesLogo_1_h9fukz.png"
            alt="Ques.AI Logo"
            className={styles.logo}
          />
          <h1 className={styles.leftContentTitle}>
            Your podcast
            <br />
            will no longer
            <br />
            be just a hobby.
          </h1>
          <p className={styles.leftContentText}>
            Supercharge Your Distribution
            <br />
            using our AI assistant!
          </p>
        </div>
      </div>
      {/* Right Side */}
      <div className={styles.loginRight}>
        <div className={styles.formBox}>
          <img
            src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744801101/ques/Group_22_d87h5e.png"
            alt=""
            className={styles.homeRightLogo}
          />
          <h2 className={styles.formTitle}>
            Welcome to <br />
            <span className={styles.brand}>Ques.AI</span>
          </h2>
          <Login user={user} handleChange={handleChange} />
          <div className={styles.options}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button className={styles.loginBtn} onClick={handleSubmit}>
            Login
          </button>
          <div className={styles.separator}>
            <span className={styles.separatorText}>or</span>
          </div>
          <button className={styles.googleBtn}>
            <img
              src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744800207/ques/google_qv3phj.png"
              alt="Google"
              className={styles.googleIcon}
            />
            Continue with Google
          </button>
          <p className={styles.signupLink}>
            Don’t have an account? <a href="#">Create Account</a>
          </p>
        </div>
      </div>
    </div>
  );
};
