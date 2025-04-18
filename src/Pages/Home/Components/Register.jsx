import React from "react";
import styles from "./Login.module.css";
export const Register = ({ user, handleChange }) => {
  return (
    <div>
      <input
        type="email"
        placeholder="Email Address"
        className={styles.input}
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={user.password}
        className={styles.input}
        onChange={handleChange}
      />
    </div>
  );
};
