import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "../Login";

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