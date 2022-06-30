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
import {db, storage} from "../../firebase";
import { getAuth } from "firebase/auth";
import { CompanyProps } from "../../utils/interfaces/CompanyProps";
import { DropdownButtonCompanies } from "./DropdownButtonCompanies";
import { DropdownButtonDomains } from "./DropdownButtonDomains";
import Camera from "../../svg/Camera";
import Delete from "../../svg/Delete";
import {deleteObject, getDownloadURL, ref, uploadBytes} from "firebase/storage";

interface OfferEditProps extends JobInterface {}

export const OfferEdit: React.FC<OfferEditProps> = (props) => {
  const [title, setTitle] = useState<string>("Default title");
  const [location, setLocation] = useState<string>(props.location ?? "");
  const [salary, setSalary] = useState<string>(props.salary ?? "");
  const [description, setDescription] = useState<string>(
    props.description ?? ""
  );
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [headMaster, setHeadMaster] = useState<string|null>(null);
  const [id, setId] = useState<string>("");
  const [domain, setDomain] = useState<string>(props.domain ?? "");
  const [company, setCompany] = useState<CompanyProps | null>(null);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [imgPath, setImgPath] = useState<string|null>("");
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
      setImgUrl(props.headMasterUrl ?? "");
      setId(props.id ?? "n-are");
      console.log("the id is  " + props.id)
      setImgPath(props.imgPath ?? "")
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

  useEffect(() => {
    if (imgFile) {
      const uploadImg = async () => {
        const imgRef = ref(storage, `images/${id}`);
        try {
          if(imgPath) {
            await deleteObject(ref(storage, imgPath));
          }
          const snap = await uploadBytes(imgRef, imgFile);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          setImgUrl(url);

          await updateDoc(doc(db, "images", id), {headMasterURL: url, imgPath: snap.ref.fullPath});
          setImgFile(null);
        }catch (err){console.log(err)}
      }
      uploadImg().then();
    }
  }, [imgFile]);

  const handleDelete = () => {
    console.log("In delete: \nPropsId: " + props.id!);
    deleteDoc(doc(db, "jobOffers", props.id!)).then(
      () => {
        console.log("delete");
      },
      (err) => console.log(err)
    );
  };

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete job headmaster?");
      if (confirm) {
        await deleteObject(ref(storage, headMaster!));

        await updateDoc(doc(db, "jobOffers", id), {
          avatar: "",
          avatarPath: "",
        });
        setHeadMaster(null)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-100">
      <div className="img_container">
        <img src={imgUrl} alt="headmaster_jobOffer" />
        <div className="overlay">
          <div>
            <label htmlFor="photo">
              <Camera />
            </label>
            {imgUrl ? <Delete deleteImage={deleteImage} /> : null}
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="photo"
                onChange={(e) => {if(e && e.target && e.target.files)setImgFile(e.target.files[0]!)}}
            />
          </div>
        </div>
        {/*TODO: make this image to be able to be edited*/}
      </div>
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
          <FormControl
            value={salary}
            onChange={(event) => setSalary(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Domain</FormLabel>
          <DropdownButtonDomains setDomain={setDomain} domain={domain} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormControl
            as="textarea"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </FormGroup>
        <br />
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
