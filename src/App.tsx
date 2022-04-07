import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthPage} from "./pages/auth-page/AuthPage";

const App: React.FC = () => {
  return <BrowserRouter>
    <div id="app">
      <div id="app__routes">
        <Routes>
          <Route path="/" element={<AuthPage/>}/>
        </Routes>
      </div>
    </div>
  </BrowserRouter>
}

export default App;
