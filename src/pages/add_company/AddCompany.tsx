import React, { FormEvent, useRef, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
} from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import {db, storage} from "../../firebase";
import { useNavigate } from "react-router-dom";
import {getAuth} from "firebase/auth";
import {ref, uploadBytes} from "firebase/storage";

export const AddCompany: React.FC = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const noEmployeeRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  let navigate = useNavigate();

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    setImage(e.target.files![0]);
  };
  const validationInputData = (
    title: string,
    noEmployee: number,
    location: string
  ) => {
    if (title.length < 3) {
      alert("Too short company name!");
      return false;
    }
    if (noEmployee < 0 || noEmployee > 99999999) {
      alert("This number of employees is impossible");
      return false;
    }
    if (location === "") {
      alert("Add a proper location");
      return false;
    }
    return true;
  };

  const uploadImage = async (key:string) => {
    if(image === null) return;
    const imgRef = ref(storage, `logos/${key}`);
    await uploadBytes(imgRef, image);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    const noEmployee = parseInt(noEmployeeRef.current?.value!);
    const location = locationRef.current?.value;

    if (validationInputData(title!, noEmployee, location!)) {
      const companiesCollRef = collection(db, "companies");
      addDoc(companiesCollRef, {
        name: title,
        noEmployee: noEmployee,
        location: location,
        manager: getAuth().currentUser?.uid,
      })
        .then((response) => {
          const keyDoc = response.id;
          uploadImage(keyDoc);
          alert(`The ${title} company is added!`);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });



      navigate("/create-offer");
    }
  };
  return (
    <div>
      <h1>Let's add your first company!</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>What is the title of your company?</FormLabel>
          <FormControl placeholder="Grate company" ref={titleRef} />
        </FormGroup>
        <FormGroup>
          <FormLabel>What is the logo of your company?</FormLabel>
          <FormControl type="file" onChange={imageHandler} />
        </FormGroup>
        {image ? (
          <FormGroup>
            <FormLabel>The current logo is:</FormLabel>
            <Image src={URL.createObjectURL(image)} alt="logoCompany" />
          </FormGroup>
        ) : (
          <></>
        )}
        <FormGroup>
          <FormLabel>How many employees do you already have?</FormLabel>
          <FormControl placeholder="Number..." ref={noEmployeeRef} />
        </FormGroup>
        <FormGroup>
          <FormLabel>
            Where is the headquarter of your company located?
          </FormLabel>
          <FormControl placeholder="In a beautiful city" ref={locationRef} />
        </FormGroup>
        <FormGroup>
          <Button type="submit" variant="primary btn-block">
            Let's add job offers
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};