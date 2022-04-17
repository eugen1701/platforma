import React, { useState } from "react";
import "./Login.scss";
import { Form, Button } from 'react-bootstrap';

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
//color-overlay d-flex justify-content-center align-items-center
  return (
    <div id="login">
      <div className="p-5 m-auto rounded-lg">
        <h1 id="login__heading" className="text-black text-large">
          Login page
        </h1>
        <Form className="rounded p-4 p-sm-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Email"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me"/>
          </Form.Group>

          <Button variant="primary btn-block w-100" type="submit" id="login-button">Login</Button>

        </Form>
      </div>
    </div>
  );
};
