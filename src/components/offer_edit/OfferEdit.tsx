import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { JobInterface } from "../../utils/interfaces/JobInterface";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { CompanyProps } from "../../utils/interfaces/CompanyProps";
import { DropdownButtonCompanies } from "./DropdownButtonCompanies";
import { DropdownButtonDomains } from "./DropdownButtonDomains";

interface OfferEditProps extends JobInterface {}

export const OfferEdit: React.FC<OfferEditProps> = (props) => {
  const [title, setTitle] = useState<string>("Default title");
  const [location, setLocation] = useState<string>(props.location ?? "");
  const [salary, setSalary] = useState<string>(props.salary ?? "");
  const [description, setDescription] = useState<string>(
    props.description ?? ""
  );
  const [id, setId] = useState<string>("");
  const [domain, setDomain] = useState<string>(props.domain ?? "");
  const [company, setCompany] = useState<CompanyProps | null>(null);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  useEffect(() => {
    const q = query(
      collection(db, "companies"),
      where("manager", "==", getAuth().currentUser?.uid)
    );
    onSnapshot(q, (querySnapShot) => {
      console.log(props);
      const loadedCompanies: CompanyProps[] = querySnapShot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          name: docData.name ?? "default_name",
          manager: docData.manager ?? "default_name",
          logoUrl: docData.logoUrl ?? "",
          location: docData.location ?? "",
        };
      });
      setCompanies(loadedCompanies);
      setCompany(loadedCompanies[0]);
      setDomain(props.domain ?? "");
      setTitle(props.title);
      setLocation(props.location ?? "");
      setSalary(props.salary ?? "");
      setDescription(props.description ?? "");
      setId(props.id ?? "n-are");
    });
  }, [props]);

  const handleSubmitUpdate = () => {
    updateDoc(doc(db, "jobOffers", props.id!), {
      domain,
      title,
      location,
      salary,
      description,
    }).then(
      () => {},
      (err) => console.log(err)
    );
  };

  const handleDelete = () => {
    console.log("In delete: \nPropsId: " + props.id!)
    deleteDoc(doc(db, "jobOffers", props.id!)).then(
      () => {console.log("delete")},
      (err) => console.log(err)
    );
  };
  return (
    <div className="w-100">
      <Form onSubmit={handleSubmitUpdate}>
        <FormGroup>
          <FormLabel>Title</FormLabel>
          <FormControl
            placeholder="Please introduce title"
            title="Job offer title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Company</FormLabel>
          <DropdownButtonCompanies
            companies={companies}
            setCompany={setCompany}
            company={company}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Location</FormLabel>
          <FormControl
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Salary</FormLabel>
          <FormControl value={salary} onChange={event => setSalary(event.target.value)} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Domain</FormLabel>
          <DropdownButtonDomains setDomain={setDomain} domain={domain} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormControl as="textarea" value={description} onChange={event => setDescription(event.target.value)}/>
        </FormGroup>
        <ButtonGroup>
          <Button variant="success" type="submit">
            Update
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </Form>
    </div>
  );
};
