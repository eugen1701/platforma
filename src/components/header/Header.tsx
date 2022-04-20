import React from "react";
import { Logo } from "../logo/Logo";
import { Link } from "react-router-dom";
import "./Header.scss";

export const Header: React.FC = () => {
  return (
    <header id="header" className="d-flex justify-content-sm-between">
      <div id="header__left-side">{<Logo />}</div>

      <img
        src="/open-iconic/svg/menu.svg"
        id="hamburger-menu"
        alt="Open Navigation"
        className="navbar-toggler-icon"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={() => {
          document.getElementById("mobile-nav")!.classList.add("menu-btn");
        }}
      />

      <nav
        id="mobile-nav"
        className="dropdown-menu"
        aria-labelledby="hamburger-menu"
      >
        ul
        <button
          onClick={() => {
            console.log("daf");
            document.getElementById("mobile-nav")!.classList.remove("menu-btn");
          }}
        >
          <img src="/open-iconic/svg/x.svg" alt="Close Navigation" />
        </button>
        <button className="dropdown-item" type="button">
          <Link to="/login" className="text-dark">
            Login
          </Link>
        </button>
        <button className="dropdown-item" type="button">
          Sign up
        </button>
        <button className="dropdown-item" type="button">
          About us
        </button>
      </nav>

      <div id="header__right-side">
        <nav>
          <ul id="header__nav-buttons" className="ul flex-pull-right">
            <li>
              <Link to="/login" className="text-dark">
                Login
              </Link>
            </li>
            <li>
              <Link to="/" className="text-dark">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/" className="text-dark">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="text-dark">
                About Us
              </Link>
            </li>
          </ul>
        </nav>

        <nav id="header__nav" className="flex-row">
          <ul id="header__nav-links" className="ul">
            <li>
              <Link to="/" className="text-dark">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="text-dark">
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
