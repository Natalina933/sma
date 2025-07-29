"use client";
import React from "react";
import UniversalLoginForm from "../../../../components/UniversalLoginForm/UniversalLoginForm";
import styles from "./page.module.css";
export default function LoginPage() {
  return (
    <div className={styles.container}>
      <UniversalLoginForm userType="admin" />
    </div>
  );
}
