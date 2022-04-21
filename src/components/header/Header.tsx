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
        <ul>
          <li>
            <button className="btn-close-white d-block justify-content-center" id="close-button"
              onClick={() => {
                console.log("daf");
                document
                  .getElementById("mobile-nav")!
                  .classList.remove("menu-btn");
              }}
            >
              <img src="/open-iconic/svg/x.svg" className="" alt="Close Navigation" />
            </button>
          </li>
          <li>
            <button className="dropdown-item btn-light" type="button">
              <Link to="/login" className="text-dark text-decoration-none">
                Login
              </Link>
            </button>
          </li>
          <li>
            <button className="dropdown-item btn-light" type="button">
              <Link to="/signup" className="text-dark text-decoration-none">
                Sign Up
              </Link>
            </button>
          </li>
          <li>
            <button className="dropdown-item btn-light" type="button">
              <Link to="/about-us-page" className="text-dark text-decoration-none">
                About Us
              </Link>
            </button>
          </li>
        </ul>
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
              <Link to="/signup" className="text-dark">
                Sign Up
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
