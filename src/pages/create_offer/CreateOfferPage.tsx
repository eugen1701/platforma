import React, {FormEvent, useRef, useState} from "react";
import {
    Button,
    Dropdown,
    DropdownButton,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    FormText, Image, InputGroup
} from "react-bootstrap";
import {DomainList} from "../../utils/DomainList";
import {storage, db} from "../../firebase";
import {ref, uploadBytes} from "firebase/storage";
import {addDoc, collection} from 'firebase/firestore'
import './CreateOfferPage.scss'

export const CreateOfferPage:React.FC = () => {
    const [title, setTitle] = useState("");
    const [domain, setDomain] = useState("");
    const salaryRef = useRef<HTMLInputElement | null>(null);
    const locationRef = useRef<HTMLInputElement | null>(null);
    const [imageUpload, setImageUpload] = useState<File|null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null >(null);
    const uploadImage = (key:string) => {
        if(imageUpload == null) return;
        const imageRef = ref(storage, `images/${key}`)
        uploadBytes(imageRef, imageUpload).then(() => alert("image uploaded"))
    }
    const fileChangedHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        if(!e.target.files)return;
        setImageUpload(e.target.files[0]);
        let image = document.getElementById("previewJobImage")!;
        image.setAttribute("src", URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        const description = descriptionRef.current?.value;
        const salary = salaryRef.current?.value;
        const location = locationRef.current?.value;
        const jobOfferCollRef = collection(db, 'jobOffers');
        addDoc(jobOfferCollRef, {'title':title, "domain":domain, "description":description, "salary":salary, "location":location}).then(
            response => {
                const keyDoc = response.id;
                uploadImage(keyDoc);
                console.log(response);
            }
        ).catch(error => console.log(error.message));



    }

    return <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <FormLabel for="jobTitle">Job Title</FormLabel>
                <Form.Control placeholder="Job Title" onChange={(e) => setTitle(e.target.value)}/>
                <Form.Text className="text-muted">Give an attractive title</Form.Text>
            </FormGroup>
            <FormGroup>
                <FormLabel for="jobDomain">Job Domain</FormLabel>
                <div className="d-flex">
                    <InputGroup>
                        <DropdownButton title="Domain" variant="outline-secondary">
                            {DomainList.map((domain) => (
                                <Dropdown.Item onClick={() => setDomain(domain)}>
                                    {domain}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                        <FormControl placeholder={domain} aria-label="Text input with dropdown button" disabled={true}/>
                    </InputGroup>

                </div>

            </FormGroup>
            <FormGroup>
                <FormLabel for="jobSalaryRange">Salary Range</FormLabel>
                <FormControl placeholder="Salary Range" ref={salaryRef}/>
                <FormText className="text-muted">You can set it private or give a motivational range</FormText>
            </FormGroup>
            <FormGroup>
                <FormLabel for="jobImage">Select the image to represent the job or your company</FormLabel><br/>
                <input type="file" onChange={fileChangedHandler}/>
                <Image id="previewJobImage" src="https://image.shutterstock.com/image-vector/abstract-wave-logo-sample-vector-260nw-392139418.jpg" alt="preview image"/>
            </FormGroup>
            <FormGroup>
                <FormLabel for="jobLocation">What will be the location of the job?</FormLabel>
                <FormControl placeholder="Insert a location" ref={locationRef}/>
            </FormGroup>
            <FormGroup>
                <FormLabel for="jobDescription">Add a description with more details about the job</FormLabel>
                <FormControl as="textarea" rows={3} ref={descriptionRef}/>
            </FormGroup>
            <Button variant="primary btn-block" type="submit">Add offer</Button>
        </Form>
    </div>
}