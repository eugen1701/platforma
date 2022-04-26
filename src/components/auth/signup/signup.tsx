import React, {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {Logo} from "../../logo/Logo";

export const Signup: React.FC = () => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    function renderFormPage() {

    }
  return (
<div className="container-fluid d-flex">
    <div className="row w-100   ">
    <div className="col" id="in-page-logo">
        {<Logo/>}
    </div>
        <div className="col">
    <Card className="border-5 shadow bg-light" id="card">
        <div className="p-5 m-auto rounded-lg">
            <h1 id="signup__heading" className="text-black text-large">
                Sign up
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
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control type="password" placeholder="Repeat Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="I agree with terms and conditions" />
                </Form.Group>
                <Button
                    variant="primary btn-block w-100"
                    type="submit"
                    id="login-button"
                >
                    Sign up
                </Button>
            </Form>
            <h5 >From here the user should be redirected to a page where he can fill in the personal information in order to make the recomandation possible</h5>
        </div>
    </Card>
        </div>
    </div>
</div>
  );
};