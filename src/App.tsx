import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthPage} from "./pages/auth-page/AuthPage";
import {Header} from "./components/header/Header";

const App: React.FC = () => {
  return <BrowserRouter>
    <div id="app">
      <Header/>
      <div id="app__routes">
        <Routes>
          <Route path="/" element={<AuthPage/>}/>
        </Routes>
      </div>
    </div>
  </BrowserRouter>
}

export default App;
