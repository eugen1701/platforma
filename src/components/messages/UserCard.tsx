import React, {useEffect, useState} from "react";
import {Card, CardImg} from "react-bootstrap";
import {doc, getDoc, onSnapshot} from "firebase/firestore";
import {db, storage} from "../../firebase";
import {UsersProps} from "./MessageInbox";
import {getDownloadURL, ref} from "firebase/storage";

export interface UserCardProps {
    user:UsersProps;
    setSelectedUserFunction:(str:string|null) => void;
}
export const UserCard: React.FC<UserCardProps> = ({ user: { userId, type }, ...rest }) => {
  //TODO:style the page
    const [img, setImg] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [subName, setSubName] = useState<string>("");
    const [userCardId, setUserCardId] = useState<string>("");
  const [isReceiverOnline, setIsReceiverOnline] = useState<boolean>(false);
  useEffect(() => {
      let unsubscribe = () => {};

      if(type === "company"){
          unsubscribe = onSnapshot(doc(db, "companies", userId.trim()), (snapshot) => {

              console.log(snapshot.exists())
              getDownloadURL(ref(storage, `logos/${snapshot.id}`)).then(url => setImg(url)).then(() => console.log("imgg is " + img));
              setName(snapshot.data()?.name!);
              setSubName(snapshot.data()?.managerEmail!)
              setUserCardId(snapshot.data()?.manager!)
              getDoc(doc(db, "users", snapshot.data()?.manager!)).then(data => setIsReceiverOnline(data.data()?.isOnline!));
          })

      }
      else if (type === "normal") {
          unsubscribe = onSnapshot(doc(db, "users", userId), (snapshot) => {
              const data = snapshot.data();
              getDownloadURL(ref(storage, `images/${snapshot.id.trim()}`)).then(url => setImg(url));
              setName(data?.email!);
              setSubName(data?.email!);
              setUserCardId(snapshot.id);
              console.log("snapshotid is: "+snapshot.id)
              setIsReceiverOnline(data?.isOnline!);
      })
      }


      return () => {
          unsubscribe();
      };
  }, [userId]);

  return (
    <div
      onClick={() => {
        rest.setSelectedUserFunction(userCardId);
        console.log("setam selecteduser cu " + userCardId);
      }}
    >
      <Card>
        <Card.Body>
          <div className="d-flex messages_user">
            <div>
              <CardImg
                src={img}
                alt="profileCompany"
                style={{ maxWidth: "8em" }}
              />
            </div>
            <div className="d-flex flex-column justify-content-start">
              <div>
                <h4>{name}</h4>
              </div>
              <div>
                <h5>{subName}</h5>
              </div>
                <div className="d-flex justify-content-center">
                    <div
                        className={`user_status ${
                            isReceiverOnline ? "online" : "offline"
                        }`}
                    ></div>
                </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};