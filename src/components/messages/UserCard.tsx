import React, {useEffect, useState} from "react";
import {Card, CardImg} from "react-bootstrap";
import {doc, getDoc, onSnapshot, DocumentData} from "firebase/firestore";
import {db, storage} from "../../firebase";
import {UsersProps} from "./MessageInbox";
import {getDownloadURL, ref} from "firebase/storage";
import {getAuth} from "firebase/auth";


export interface UserCardProps {
    user:UsersProps;
    selectedUser:string|null;
    setSelectedUserFunction:(str:string|null) => void;
    setHeaderInfo:(str:string|null)=>void;
    setCompanyId:(str:string|null)=>void|null;
}
export const UserCard: React.FC<UserCardProps> = ({ user: { userId, type }, ...rest }) => {
  //TODO:style the page
    const [img, setImg] = useState<string>("");
    const [data, setData] = useState<DocumentData | string>("");//for lastMsg
    const [name, setName] = useState<string>("");
    const [subName, setSubName] = useState<string>("");
    const [userCardId, setUserCardId] = useState<string>("");
    const [companyID, setCompanyId] = useState("")
  const [isReceiverOnline, setIsReceiverOnline] = useState<boolean>(false);
  useEffect(() => {
      let unsubscribe = () => {};

      if(type === "company"){
          unsubscribe = onSnapshot(doc(db, "companies", userId.trim()), (snapshot) => {

              console.log(snapshot.exists())
              getDownloadURL(ref(storage, `logos/${snapshot.id}`)).then(url => setImg(url)).then(() => console.log("imgg is " + img));
              setName(snapshot.data()?.name!);
              setSubName(snapshot.data()?.managerEmail!)
              setCompanyId(snapshot.data()?.id)
              setUserCardId(snapshot.data()?.manager!)
              getDoc(doc(db, "users", snapshot.data()?.manager!)).then(data => setIsReceiverOnline(data.data()?.isOnline!));
          })

      }
      else if (type === "normal") {
          unsubscribe = onSnapshot(doc(db, "users", userId), (snapshot) => {
              const data = snapshot.data();
              // getDownloadURL(ref(storage, `images/${snapshot.id.trim()}`)).then(url => setImg(url));
              setImg(data?.avatar ==="" ? "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png" : data?.avatar);
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

  useEffect(()=>{
      const senderId = getAuth().currentUser?.uid
      const receiver = userId;
      const id =
          senderId! > receiver!
              ? `${senderId! + receiver!}`
              : `${receiver! + senderId!}`;
      let unsub = onSnapshot(doc(db, "lastMsg", id ), doc=>{
          setData(doc.data() ?? "noData");
      })

      console.log('UserId: ' + userId + "\nselectedUser "+rest.selectedUser)
      return () => {
          unsub();
      };
  }, [])

  return (
    <div
      onClick={() => {
        rest.setSelectedUserFunction(userCardId);
        rest.setCompanyId(companyID!);
        rest.setHeaderInfo(name)
        console.log("setam selecteduser cu " + userCardId);
      }}
      style={{height: ""}}
      className={`user_wrapper ${rest.selectedUser === userId && "selected_user"}`}
    >
      <Card>
        <Card.Body>
          <div className="d-flex messages_user">
            <div>
              <CardImg
                src={img}
                alt="profileCompany"
                style={{ width: "8em" }}
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