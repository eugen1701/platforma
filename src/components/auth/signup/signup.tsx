import React, {FormEvent, FormEventHandler, useMemo, useRef, useState} from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Logo } from "../../logo/Logo";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {useAuth} from "../../../context/AuthContext";

export const Signup: React.FC = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const passwordConfirmation = passwordConfirmRef.current?.value

    if (!email || !password || !passwordConfirmation || password !== passwordConfirmation) {
      return
    }

    const result = await createUserWithEmailAndPassword(getAuth(), email, password)
    // TODO: Redirect to app content
  }

  return (
    <div className="container-fluid d-flex">
      <div className="row w-100   ">
        <div className="col" id="in-page-logo">
          {<Logo />}
        </div>
        <div className="col">
          <Card className="border-5 shadow bg-light" id="card">
            <div className="p-5 m-auto rounded-lg">
              <h1 id="signup__heading" className="text-black text-large">
                Sign up
              </h1>
              <Form className="rounded p-4 p-sm-3" onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    ref={emailRef}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Repeat Password</Form.Label>
                  <Form.Control type="password" placeholder="Repeat Password" ref={passwordConfirmRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="I agree with terms and conditions"
                  />
                </Form.Group>
                <Button
                  variant="primary btn-block w-100"
                  type="submit"
                  id="login-button"
                >
                  Sign up
                </Button>
              </Form>
              <h5>
                From here the user should be redirected to a page where he can
                fill in the personal information in order to make the
                recomandation possible
              </h5>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
