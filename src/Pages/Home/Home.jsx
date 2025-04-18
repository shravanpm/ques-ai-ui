import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Login } from "./Components/Login";
import { useNavigate } from "react-router-dom";
import { Register } from "./Components/Register";
import { isValidEmail, saveToLocalStorage } from "./../../utils/utils";
import axios from "axios";
import { config } from "./../../config/config";
import { UserContext } from "../../Context/UserContext/UserContext";

export const Home = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isCreateUser, setIsCreateUser] = useState(false);
  const { userAuth, setUserAuth } = useContext(UserContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    //TODO
    const { email, password } = user;
    if (!isValidEmail(email)) {
      alert("Enter valid Email");
      return;
    }
    if (password.length < 8) {
      alert("Password length should be greater than 8");
      return;
    }
    if (isCreateUser) {
      try {
        const { data } = await axios({
          url: `${config.base_url}/user`,
          method: "POST",
          data: user,
        });
        console.log({ data });
        setUser({ email: "", password: "" });
        handleRegister();
      } catch (error) {
        //TODO
      }
    } else {
      try {
        const { data } = await axios({
          url: `${config.base_url}/user/login`,
          method: "POST",
          data: user,
        });
        console.log({ data });
        // saveToLocalStorage("token", data.token);
        setUserAuth({ token: data?.token, user: data?.user });

        setUser({ email: "", password: "" });
        handleRegister();
        navigate("/projects");
      } catch (error) {
        //TODO
      }
    }
  };

  const handleRegister = () => {
    setIsCreateUser(!isCreateUser);
  };

  useEffect(() => {
    if (userAuth.token) {
      navigate("/projects");
    }
  }, []);
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeLeft}>
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
      <div className={styles.rightContent}>
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
          {isCreateUser ? (
            <Register user={user} handleChange={handleChange} />
          ) : (
            <Login user={user} handleChange={handleChange} />
          )}
          {!isCreateUser && (
            <div className={styles.options}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
          )}
          <button className={styles.loginBtn} onClick={handleSubmit}>
            {isCreateUser ? "Register" : "Login"}
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
          {
            <p className={styles.signupLink} onClick={handleRegister}>
              {isCreateUser ? (
                <span>
                  {"Already a user, continue to "}
                  <a href="#">Login</a>
                </span>
              ) : (
                <span>
                  {"Don’t have an account? "}
                  <a href="#">Create Account</a>
                </span>
              )}
            </p>
          }
        </div>
      </div>
    </div>
  );
};
