import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Image,
  InputGroup,
} from "react-bootstrap";
import { DomainList } from "../../utils/DomainList";
import { storage, db } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import "./CreateOfferPage.scss";
import { getAuth } from "firebase/auth";
import { CompanyProps } from "../../utils/interfaces/CompanyProps";

export const CreateOfferPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState<CompanyProps | null>(null);
  const [companies, setCompanies] = useState<CompanyProps[] | null>(null);
  const [useLogo, setUseLogo] = useState<string | null>(null);
  const [domain, setDomain] = useState("");
  const salaryRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const uploadImage = (key: string) => {
    if(!useLogo){
      if (imageUpload == null) return;
      const imageRef = ref(storage, `images/${key}`);
      uploadBytes(imageRef, imageUpload).then(() => alert("image uploaded"));
    }
  };
  const fileChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setUseLogo(null);
    setImageUpload(e.target.files[0]);
    let image = document.getElementById("previewJobImage")!;
    image.setAttribute("src", URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = descriptionRef.current?.value;
    const salary = salaryRef.current?.value;
    const location = locationRef.current?.value;

    let headMasterURL = "img_in_storage";
    if(useLogo) {
      headMasterURL = useLogo;
    }

    const jobOfferCollRef = collection(db, "jobOffers");
    addDoc(jobOfferCollRef, {
      title: title,
      domain: domain,
      description: description,
      salary: salary,
      location: location,
      headMasterURL
    })
      .then((response) => {
        const keyDoc = response.id;
        if(!useLogo)uploadImage(keyDoc);
        console.log(response);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    const getCompanies = async () => {
      const companiesCollRef = collection(db, "companies");
      const q = query(
        companiesCollRef,
        where("manager", "==", getAuth().currentUser?.uid)
      );
      const querySnapShot = await getDocs(q);
      const documentUrlPromises = querySnapShot.docs.map((doc) => {
        return getDownloadURL(ref(storage, `logos/${doc.id}`)).then((url) => {
          return {
            id: doc.id,
            url,
          };
        });
      });

      const documentUrls = await Promise.all(documentUrlPromises);
      const loadedCompanies: CompanyProps[] = querySnapShot.docs.map((doc) => {
        const docData = doc.data();

        return {
          name: docData.name,
          location: docData.location ?? "",
          noEmployees: docData.noEmployee ?? "",
          manager: docData.manager,
          logoUrl: documentUrls.find((e) => e.id === doc.id)?.url ?? "",
        };
      });

      setCompany(loadedCompanies[0]);
      setCompanies(loadedCompanies);
    };
    getCompanies();
  }, []);

  const handleUseLogo = () => {
    if(company?.logoUrl){
      setUseLogo(company?.logoUrl!);
      let inputField = document.getElementById("inputHeadMasterJobOffer")!;
      // inputField.setAttribute("value", "");
      console.log("aiciiiii")
    }
    else {
      alert("There is no logo for the chosen company :(")
      return;
    }

  }

  const getSrcImgHeadMasterJobOffer = () =>{
    if(useLogo)return useLogo;
    if(imageUpload){
      let image = document.getElementById("previewJobImage")!;
      image.setAttribute("src", URL.createObjectURL(imageUpload));
    }
    return "https://image.shutterstock.com/image-vector/abstract-wave-logo-sample-vector-260nw-392139418.jpg";
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel for="jobTitle">Job Title</FormLabel>
          <Form.Control
            placeholder="Job Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Text className="text-muted">Give an attractive title</Form.Text>
        </FormGroup>
        <FormGroup>
          <FormLabel>Company</FormLabel>

            <InputGroup>
              <DropdownButton title="Company" variant="outline-secondary">
                {companies?.map((c) => (
                  <Dropdown.Item onClick={() => setCompany(c)}>
                    {c.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <FormControl value={company?.name}
                           aria-label="Text input with dropdown button"
                           disabled={true}/>
            </InputGroup>
            <Form.Text className="text-muted">Your default company is selected by default</Form.Text>

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
              <FormControl
                placeholder={domain}
                aria-label="Text input with dropdown button"
                disabled={true}
              />
            </InputGroup>
          </div>
        </FormGroup>
        <FormGroup>
          <FormLabel for="jobSalaryRange">Salary Range</FormLabel>
          <FormControl placeholder="Salary Range" ref={salaryRef} />
          <FormText className="text-muted">
            You can set it private or give a motivational range
          </FormText>
        </FormGroup>
        <FormGroup>
          <FormLabel for="jobImage">
            Select the image to represent the job or your company
          </FormLabel>
          <br />
          <FormControl id="inputHeadMasterJobOffer" type="file" onChange={fileChangedHandler}/>
          <div className="d-flex justify-content-start" id="setImgRow">
            <div className="d-flex flex-column justify-content-center"><FormLabel>The headmaster for your job offer: </FormLabel></div>
            <div><Image
                id="previewJobImage"
                src={getSrcImgHeadMasterJobOffer()}
                alt="preview image"
            /></div>
            <div className="d-flex flex-column justify-content-center"><h6>or</h6></div>
            <div className="d-flex flex-column justify-content-center">
              <div className="d-flex justify-content-start"><Button onClick={handleUseLogo}>Use logo</Button></div>
              <FormText className="text-muted">Use the logo of the company as the headmaster for your job offer</FormText>
            </div>
          </div>
        </FormGroup>
        <FormGroup>
          <FormLabel for="jobLocation">
            What will be the location of the job?
          </FormLabel>
          <FormControl placeholder="Insert a location" ref={locationRef} />
        </FormGroup>
        <FormGroup>
          <FormLabel for="jobDescription">
            Add a description with more details about the job
          </FormLabel>
          <FormControl as="textarea" rows={3} ref={descriptionRef} />
        </FormGroup>
        <Button variant="primary btn-block" type="submit">
          Add offer
        </Button>
      </Form>
    </div>
  );
};