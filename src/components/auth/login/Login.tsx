import React, {FormEvent, useRef, useState} from "react";
import "./Login.scss";
import {Form, Button, Card, Alert} from "react-bootstrap";
import { Logo } from "../../logo/Logo";
import { signInWithEmailAndPassword, getAuth} from "firebase/auth"
import {Link, useNavigate} from "react-router-dom";
import {updateDoc, doc} from "firebase/firestore";
import {db} from "../../../firebase";


export const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<null | string>(null);
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "/";
    navigate(path);
  }

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if(!email){
      //alert("Please insert email");
      setError("Please insert email")
      return
    }
    if(!password){
      //alert("Please insert password")
      setError("Please insert password")
      return
    }

    try{
    const result = await signInWithEmailAndPassword(getAuth(), email, password).then((result) => {
       updateDoc(doc(db, "users", result.user.uid), {isOnline: true});
        routeChange();
    }, (error) => {
      setError("User not found!")
    })
    } catch (err) {
      console.log(err);
     // console.log(err);
    }

  }

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
            <Form className="rounded p-4 p-sm-3" onSubmit={onFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Email" ref={emailRef}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
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
            {error && <Alert id="error-auth"variant="danger">{error}</Alert> }
          </div>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to={"/signup"}>Sign up</Link>
          </div>
          <Link to="/forgot-password" className="w-100 text-center mt-2"><p>Forgot your password?</p></Link>
        </Card>
        </div>
      </div>
    </div>
  );
};
