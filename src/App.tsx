import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthPage} from "./pages/auth-page/AuthPage";
import {Header} from "./components/header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Signup} from "./components/auth/signup/signup";

const App: React.FC = () => {
  return <BrowserRouter>
    <div id="app">
      <Header/>
      <div id="app__routes">
        <Routes>
          <Route path="/login" element={<AuthPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
    </div>
  </BrowserRouter>
}

export default App;
