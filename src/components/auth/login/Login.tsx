import React, { useState } from "react";
import "./Login.scss";
import Frorm from 'react-bootstrap';

export interface AuthInterface {
  authenticationError: Error | null;
  isAuthenticated: boolean;
  pendingAuthentication: boolean;
  userId?: number;
  userName?: string;
  email?: string;
  password?: string;
  token: string;
}

const initialState: AuthInterface = {
  isAuthenticated: false,
  authenticationError: null,
  pendingAuthentication: false,
  token: "",
};

export interface AuthProps {
  token: string;
  userId: number;
  userName: string;
  role: string;
  kitchenId: string;
}

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const Login: React.FC = () => {
  const [state, setState] = useState<AuthInterface>(initialState);
  const { email, password } = state;

  function handleLogin(e: { preventDefault: () => void }) {}

  return (
    <div id="login">
      <h1 id="login__heading" className="text-black text-large">
        Login page
      </h1>
      <br />
      <form id="login__form">
        <ul id="login__form-page" className="ul login__form-ul">
          <li className="input">
            <label htmlFor="user-username">Email</label>
            <input
              type="email"
              name="username"
              id="login__username"
              value={email}
              onChange={(event) =>
                setState({ ...state, email: event.target.value })
              }
            />
          </li>
          <li className="input">
            <label htmlFor="user-password">Password</label>
            <input
              type="password"
              name="user-password"
              id="login__user-password"
              value={password}
              onChange={(event) =>
                setState({ ...state, password: event.target.value })
              }
            />
          </li>
        </ul>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <div id="login__form-action" className="flex-row-center-y">
          <button
            className="w-100 btn btn-lg btn-primary"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
