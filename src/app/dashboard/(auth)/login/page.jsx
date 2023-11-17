"use client"
import styles from "./page.module.css";
import Button from "@/components/button/Button";

const Login = () => {
  return <div className={styles.container}>
    <Button>Connecter avec Google</Button>
  </div>;
};

export default Login;
