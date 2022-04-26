import React, { useState } from "react";
import "./Login.scss";
import { Form, Button, Card } from "react-bootstrap";
import { Logo } from "../../logo/Logo";

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
    <div className="container-fluid d-flex">
      <div className="row w-100">
        <div id="in-page-logo" className="col">
          {<Logo />}
        </div>
        <div className="col">
        <Card className="border-5 shadow bg-light" id="card">
          <div className="p-5 m-auto rounded-lg">
            <h1 id="login__heading" className="text-black text-large">
              Login page
            </h1>
            <Form className="rounded p-4 p-sm-3">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>

              <Button
                variant="primary btn-block w-100"
                type="submit"
                id="login-button"
              >
                Login
              </Button>
            </Form>
          </div>
        </Card>
        </div>
      </div>
    </div>
  );
};
