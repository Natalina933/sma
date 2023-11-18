"use client"
import styles from "./page.module.css";
import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}
      >
       Connection avec Google
      </button>
    </div>
  );
};

export default Login;
