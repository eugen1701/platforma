import React, {FormEvent, useRef} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../firebase";
import {useNavigate} from "react-router-dom";

export const AddCompany:React.FC = () => {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const noEmployeeRef = useRef<HTMLInputElement | null>(null);
    const locationRef = useRef<HTMLInputElement | null>(null);
    let navigate = useNavigate();

    const validationInputData = (title:string, noEmployee:number, location:string) =>{
        if(title.length <3) alert("Too short company name!")
    }
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const title = titleRef.current?.value;
        const noEmployee = parseInt(noEmployeeRef.current?.value!);
        const location = locationRef.current?.value;

        validationInputData(title!, noEmployee, location!)

        const companiesCollRef = collection(db, 'companies');
        addDoc(companiesCollRef, {"name":title, "noEmployee":noEmployee, "location":location}).then(response => {
            alert(`The ${title} company is added!`)
            console.log(response);
        })
            .catch(error => {console.log(error)})

        navigate("/create-offer");

    }
    return (<div>
        <h1>Let's add your first company!</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <FormLabel>
                    What is the title of your company?
                </FormLabel>
                <FormControl placeholder="Grate company" ref={titleRef}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>
                    How many employees do you already have?
                </FormLabel>
                <FormControl placeholder="Number..." ref={noEmployeeRef}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>
                    Where is the headquarter of your company located?
                </FormLabel>
                <FormControl placeholder="In a beautiful city" ref={locationRef}/>
            </FormGroup>
            <FormGroup>
                <Button type="submit" variant="primary btn-block">Let's add job offers</Button>
            </FormGroup>
        </Form>
    </div>);
}