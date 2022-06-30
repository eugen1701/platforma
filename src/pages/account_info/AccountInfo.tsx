import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import "./AccountInfo.scss";
import { useAuth } from "../../context/AuthContext";
import {db, storage} from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {DropdownTypeAccount} from "./DropdownTypeAccount";
import Camera from "../../svg/Camera";
import {deleteObject, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import Delete from "../../svg/Delete";

export const AccountInfo: React.FC = () => {
  const [userType, setUserType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [img, setImg] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string|null>(null);
  const [avatarPath, setAvatarPath] = useState<string|null>(null);

  let user = useAuth();
  useEffect(() => {
    const getData = async () => {
      const userCollectionRef = collection(db, "users");
      // console.log(user?.uid)
      const q = query(userCollectionRef, where("uid", "==", user?.uid));
      try {
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
          setUserType(doc.data().type);
          let date = new Date(doc.data().createdAt.seconds * 1000);
          let stringDate = date.toLocaleDateString();
          setStartDate(stringDate);
          setName(doc.data().name ?? null);
          setPhoneNumber(doc.data().phoneNumber ?? "");
          setAvatar(doc.data().avatar ?? null)
          setAvatarPath(doc.data().avatarPath ?? null);
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(storage, `avatars/${user?.uid}`);
        try {
          if(avatarPath) {
            await deleteObject(ref(storage, avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          setAvatar(url);

          await updateDoc(doc(db, "users", user?.uid!), {avatar: url, avatarPath: snap.ref.fullPath});
          setImg(null);
        }catch (err){console.log(err)}
      }
      uploadImg().then();
    }
  }, [img]);

  const handleUpdate = () => {
    updateDoc(doc(db, "users", user?.uid!), {name, type:userType, phoneNumber, avatar}).then(()=>console.log("userupdated"));
    setEditMode(false);
  };

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete avatar?");
      if (confirm) {
        await deleteObject(ref(storage, avatar!));

        await updateDoc(doc(db, "users", user?.uid!), {
          avatar: "",
          avatarPath: "",
        });
        setAvatar(null)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card>
        <div className="d-flex">
          <div className="img_container">
            <Card.Img
              className="img-thumbnail imgCardProfile"
              src={avatar? avatar:"open-iconic/img.png"}
              alt="profile-picture"
              id="profile-picture"
            />
            <div className="overlay">
              <div>
                <label htmlFor="photo">
                  <Camera />
                </label>
                {avatar ? <Delete deleteImage={deleteImage} /> : null}
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="photo"
                    onChange={(e) => {if(e && e.target && e.target.files)setImg(e.target.files[0]!)}}
                />
              </div>
            </div>
          </div>
          <Card.Body>
            <Form>
              <FormGroup>
                <FormLabel>User email:</FormLabel>
                <FormControl
                  title="email"
                  value={user?.email!}
                  readOnly
                  name="FormControl"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Name:</FormLabel>
                <FormControl
                  readOnly={!editMode}
                  title="Name"
                  placeholder={name === "" ? "No name set yet" : ""}
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Number phone:</FormLabel>
                <FormControl
                  title="Phone number"
                  placeholder={
                    phoneNumber === "" ? "No phone number set yet" : ""
                  }
                  value={phoneNumber}
                  readOnly={!editMode}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>User type:</FormLabel>
                <DropdownTypeAccount
                  userType={userType}
                  setUserType={setUserType}
                  editMode={editMode}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Our user since:</FormLabel>
                <FormControl
                  title="Registration time"
                  value={startDate}
                  readOnly={!editMode}
                  name="FormControl"
                />
              </FormGroup>
              <ButtonGroup>
                <Button onClick={() => setEditMode(true)}>Edit</Button>
                {editMode ? (
                  <Button
                    onClick={() => {
                      handleUpdate();
                    }}
                  >
                    Update
                  </Button>
                ) : (
                  <></>
                )}
              </ButtonGroup>
            </Form>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};
