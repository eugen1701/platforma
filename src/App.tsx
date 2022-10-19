import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/auth-page/AuthPage";
import { Header } from "./components/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Signup } from "./components/auth/signup/signup";
import { Welcome } from "./pages/welcome_page/Welcome";
import { AuthProvider } from "./context/AuthContext";
import { AccountInfo } from "./pages/account_info/AccountInfo";
import { CreateOfferPage } from "./pages/create_offer/CreateOfferPage";
import { AddCompany } from "./pages/add_company/AddCompany";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { ForgotPasswordPage } from "./pages/forgot_password_page/ForgotPasswordPage";
import { PrivateRoute } from "./components/private_route/PrivateRoute";
import { MessagesPage } from "./pages/messages_page/MessagesPage";
import { ManageOffers } from "./pages/manage_offers/ManageOffers";
import {AboutUs} from "./pages/about_us/AboutUs";
import {PdfViewPage} from "./pages/pdf_view_page/PdfViewPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div id="app">
          <Header />
          <div id="app__routes">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about-us" element={<AboutUs/>}/>
              <Route element={<PrivateRoute path="/account-info" />}>
                <Route path="/account-info" element={<AccountInfo />} />
              </Route>
              <Route element={<PrivateRoute path="/create-offer" />}>
                <Route path="/create-offer" element={<CreateOfferPage />} />
              </Route>
              <Route element={<PrivateRoute path="/add-company" />}>
                <Route path="/add-company" element={<AddCompany />} />
              </Route>
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route element={<PrivateRoute path="/messages" />}>
                <Route path="/messages" element={<MessagesPage />} />
              </Route>
              <Route element={<PrivateRoute path="/manage-offers" />}>
                <Route path="/manage-offers" element={<ManageOffers />} />
              </Route>
            </Routes>
          </div>
          <br />
          <br />
          <br />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
