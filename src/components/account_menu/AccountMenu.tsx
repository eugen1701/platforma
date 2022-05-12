import React, {useMemo} from "react";
import { Dropdown } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {getAuth} from "firebase/auth";



export const AccountMenu: React.FC = () => {
  const currentUser = useAuth();
  const isAuthenticated = useMemo(() => currentUser !== null, [currentUser]);
  let navigator = useNavigate();
  const logout = async () => {
    await getAuth().signOut();
    navigator("/login");
  };

  const navigateAccountInfo = async () => {
    await navigator("account-info")
  }
  return (
      <div id="account-icon-div">
        <Dropdown id="account-icon" className="dropdown">
          <Dropdown.Toggle
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
          >
            <img
                src="open-iconic/svg/person.svg"
                alt="person"
                id="person-account"
                className="navbar-toggler-icon dropdown-toggle"
            />
          </Dropdown.Toggle>
          {isAuthenticated ? (
              <Dropdown.Menu
                  id="account-menu"
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
              >
                <Dropdown.Item href="#" className="dropdown-item">
                  Favorites
                </Dropdown.Item>
                <Dropdown.Item href="#" className="dropdown-item" onClick={navigateAccountInfo}>
                  Info account
                </Dropdown.Item>
                <Dropdown.Item href="#" className="dropdown-item" onClick={logout}>
                  <img src="open-iconic/svg/account-logout.svg"/> Sing out
                </Dropdown.Item>
              </Dropdown.Menu>
          ) : (
              <Dropdown.Menu
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
              >
                <Dropdown.Item className="dropdown-item">
                  <div className="d-flex justify-content-between">
                    <Link to="/signup">Sign up</Link><img src="open-iconic/svg/check.svg" className="justify-content-center" height="13em"/>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item className="dropdown-item">
                  <div className="d-flex justify-content-between">
                    <Link to="/login">Login</Link><img src="open-iconic/svg/account-login.svg" className="justify-content-center" height="13em"/>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
          )}
        </Dropdown>
      </div>
  );
}