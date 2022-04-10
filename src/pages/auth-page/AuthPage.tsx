import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "../../components/auth/login/Login";
import '../../assets/shared_sass/_style.scss'

export const AuthPage: React.FC = () => {
  return (
    <div id="auth-page" className="flex-row">
      <section id="auth-page__left-side" className="flex-row-center-y">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </section>
    </div>
  );
};