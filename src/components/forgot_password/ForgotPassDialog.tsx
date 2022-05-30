import React, {FormEvent, useRef} from "react";
import {Button, Card, Form, FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import "./ForgotPassDialog.scss"

export const ForgotPassDialog: React.FC = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = emailRef.current?.value;

        if(!email) {
            alert("Please insert email");
        }

        try {
            sendPasswordResetEmail(getAuth(), email!).then(() => {
                navigate("/login")
            })
        }catch (err) {
            console.log(err);
        }
    }
  return (
    <div className="d-flex justify-content-center">
      <Card id="forgot-password-card" className="border-5 shadow bg-light w-25">
        <Form onSubmit={onSubmit} className="m-3">
            <FormGroup>
                <FormLabel className="h3">
                    Insert your email:
                </FormLabel>
                <FormControl type="email" placeholder="Your email" ref={emailRef}/>
            </FormGroup>
            <Button type="submit" variant="primary btn-block w-100">Send reset email</Button>
            <Link to="/login" className="text-decoration-none">Go back to login page</Link>
        </Form>
      </Card>
    </div>
  );
};