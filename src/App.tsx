import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthPage} from "./pages/auth-page/AuthPage";
import {Header} from "./components/header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Signup} from "./components/auth/signup/signup";
import {Welcome} from "./pages/welcome_page/Welcome";
import {AuthProvider} from "./context/AuthContext";

const App: React.FC = () => {
  return <BrowserRouter>
    <AuthProvider>
      <div id="app">
        <Header/>
        <div id="app__routes">
          <Routes>
            <Route path="/" element={<Welcome/>}/>
            <Route path="/login" element={<AuthPage/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </div>
      </div>
    </AuthProvider>
  </BrowserRouter>
}

export default App;
