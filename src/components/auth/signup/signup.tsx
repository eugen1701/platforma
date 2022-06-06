import React, {
  FormEvent,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Button,
  Card,
  Form,
  FormGroup,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { Logo } from "../../logo/Logo";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import { db } from "../../../firebase";
import { setDoc, collection, doc, Timestamp } from "firebase/firestore";

export const Signup: React.FC = () => {
  const [userKind, setUserKind] = useState<string>("normal");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptedCond, setAcceptedCond] = useState(false);

  let navigate = useNavigate();

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirmation = passwordConfirmRef.current?.value;

    if (
      !email ||
      !password ||
      !passwordConfirmation ||
      password !== passwordConfirmation
    ) {
      if (!email || email === "") {
        // alert("Please insert email");
        setError("Please insert email");
      }
      if (!password) {
        // alert("Please insert password");
        setError("Please insert password");
      }
      if (!passwordConfirmation) {
        // alert("Please insert again the password");
        setError("Please insert again the password");
      }
      if (password !== passwordConfirmation) {
        // alert("The passwords are not the same")
        setError("The passwords are not the same");
      }
      setLoading(false);
      return;
    }

    const result = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
    const uid = await result.user?.uid;
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, { uid: uid, type: userKind, email, isOnline: true, createdAt: Timestamp.fromDate(new Date())});

    if(userKind === "employer") navigate("/add-company");
    if(userKind === "normal")navigate("/account-info");
    else navigate("/dashboard")
  };

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
                <FormGroup>
                  <Form.Label>
                    What kind of user would you like to be?
                  </Form.Label>
                  <ButtonGroup className="d-flex">
                    <ToggleButton
                      type="radio"
                      value="normal"
                      className="col"
                      checked={userKind === "normal"}
                      variant="outline-info"
                      onClick={() => setUserKind("normal")}
                    >
                      Tomorrow employee
                    </ToggleButton>
                    <ToggleButton
                      type="radio"
                      value="employer"
                      className="col"
                      checked={userKind === "employer"}
                      variant="outline-secondary"
                      onClick={() => setUserKind("employer")}
                    >
                      Today employer
                    </ToggleButton>
                  </ButtonGroup>
                </FormGroup>
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
                  <Form.Control
                    type="password"
                    placeholder="Repeat Password"
                    ref={passwordConfirmRef}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="I agree with terms and conditions"
                    onChange={() => setAcceptedCond(!acceptedCond)}
                  />
                </Form.Group>
                <Button
                  disabled={loading || !acceptedCond}
                  variant="primary btn-block w-100"
                  type="submit"
                  id="signup-button"
                >
                  Sign up
                </Button>
              </Form>
              {error && (
                <Alert id="error-auth" variant="danger">
                  {error}
                </Alert>
              )}
            <p>Already have an account? Go <Link to="/login">login</Link>!</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
