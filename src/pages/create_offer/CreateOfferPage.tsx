import React, {useState} from "react";
import {Button, Dropdown, Form, FormControl, FormGroup, FormLabel, FormText} from "react-bootstrap";
import {DomainList} from "../../utils/DomainList";
import {storage} from "../../firebase";
import {ref, uploadBytes} from "firebase/storage";

export const CreateOfferPage:React.FC = () => {
    const [title, setTitle] = useState("");
    const [domain, setDomain] = useState("");
    const [imageUpload, setImageUpload] = useState<File|null>(null);

    const uploadImage = () => {
        if(imageUpload == null) return;
        const imageRef = ref(storage, `images/${title}`) //TODO: find a random name for the image
        uploadBytes(imageRef, imageUpload).then(() => alert("image uploaded"))
    }
    const fileChangedHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        if(!e.target.files)return;
        setImageUpload(e.target.files[0]);
    }
    return <div>
        <Form>
            <FormGroup>
                <FormLabel for="jobTitle">Job Title</FormLabel>
                <Form.Control placeholder="Job Title" onChange={(e) => setTitle(e.target.value)}/>
                <Form.Text className="text-muted">Give an attractive title</Form.Text>
            </FormGroup>
            <FormGroup>
                <FormLabel for="jobDomain">Job Domain</FormLabel>
                <Dropdown>
                    <Dropdown.Toggle className="btn btn-secondary dropdown-toggle">
                        Job Domain
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu">
                        {DomainList.map((domain) => (
                            <Dropdown.Item onClick={() => setDomain(domain)}>
                                {domain}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </FormGroup>
            <FormGroup>
                <FormLabel for="jobSalaryRange">Salary Range</FormLabel>
                <FormControl placeholder="Salary Range"/>
                <FormText className="text-muted">You can set it private or give a motivational range</FormText>
            </FormGroup>
            <FormGroup>
                <FormLabel for="jobImage">Select the image to represent the job or your company</FormLabel>
                <input type="file" onChange={fileChangedHandler}/>
                <Button onClick={uploadImage}>Upload image</Button>
            </FormGroup>

        </Form>
    </div>
}