import React from "react";
import {Logo} from "../logo/Logo";
import {Link} from "react-router-dom";
import "./Header.scss"

export const Header: React.FC = () => {
    return <header id="header">
        <div id="header__left-side">
            {<Logo/>}
        </div>

        <div id="header__right-side">
            <ul id="header__nav-buttons" className="ul flex-pull-right">
                <li><Link to="/login" className="button-no-background button-small link">Login</Link></li>
                <li><Link to="/" className="button-green-neutral button-small link">Sign Up</Link> </li>
            </ul>

            <nav id="header__nav" className="flex-row">
                <ul id="header__nav-links" className="ul">
                    <li><Link to="/" className="link text-bold">Home</Link></li>
                    <li><Link to="/" className="link text-bold">About Us</Link></li>
                </ul>
            </nav>
        </div>
    </header>
}