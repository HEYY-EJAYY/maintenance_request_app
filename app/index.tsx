import React, { useState } from "react";
import { LoginForm } from "../components/auth/LoginForm";
import { SignUpForm } from "../components/auth/SignUpForm";
import { SplashScreen } from "../components/auth/SplashScreen";
import { UserRole } from "../types";
import { AdminApp } from "./admin";
import { HomeownerApp } from "./homeowner";

type PageType = "splash" | "login" | "signup" | "homeowner-app" | "admin-app";

export default function MaintenanceApp() {
  const [currentPage, setCurrentPage] = useState<PageType>("splash");
  const [userRole, setUserRole] = useState<UserRole>("homeowner");

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === "homeowner") {
      setCurrentPage("homeowner-app");
    } else {
      setCurrentPage("admin-app");
    }
  };

  if (currentPage === "splash") {
    return <SplashScreen onGetStarted={() => setCurrentPage("login")} />;
  }

  if (currentPage === "login") {
    return (
      <LoginForm
        onLogin={handleLogin}
        onSignUpPress={() => setCurrentPage("signup")}
      />
    );
  }

  if (currentPage === "signup") {
    return (
      <SignUpForm
        onSignUp={() => setCurrentPage("login")}
        onBackToLogin={() => setCurrentPage("login")}
      />
    );
  }

  if (currentPage === "homeowner-app") {
    return <HomeownerApp onLogout={() => setCurrentPage("splash")} />;
  }

  if (currentPage === "admin-app") {
    return <AdminApp onLogout={() => setCurrentPage("splash")} />;
  }

  return null;
}
