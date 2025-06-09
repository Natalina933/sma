import React, { Suspense } from "react";
import LoginForm from "@/app/dashboard/(auth)/login/page";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <LoginForm />
    </Suspense>
  );
}
