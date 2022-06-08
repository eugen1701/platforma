import React, {useEffect, useState} from "react";
import { UserCard, UserCardProps } from "./UserCard";
import {getAuth} from "firebase/auth";
import {collection, doc, getDoc, getDocs, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../firebase";

export interface UsersProps {
  userId:string;
  type:string;
  companyId?:string;
}
export const MessageInbox: React.FC<{setSelectedCard:(str:string|null)=>void; setHeaderInfo:(str:string|null)=>void;}> = (props) => {
  const [users, setUsers] = useState<UsersProps[]>([]);
  useEffect(() => {
    (async () => {
      const auth = getAuth();
      const response = await getDoc(doc(db, "users", auth.currentUser?.uid!));

      let loadedUsers: UsersProps[] = [];

      if (response.data()?.type === "normal") {
        const companiesApplied: string[] = response.data()?.appliedToCompany;
        loadedUsers = companiesApplied.map((doc) => ({
          userId: doc,
          type: "company",
        }));
      }
      else if(response.data()?.type === "employer") {
        const q = query(collection(db, "users"), where("appliedToManager", "array-contains", auth.currentUser?.uid!));
        const responseApplicants = await getDocs(q);
        loadedUsers = responseApplicants.docs.map(
          (doc) => ({
            userId: doc.id,
            type: "normal",
          })
        );
      }

      setUsers(loadedUsers);
    })()
  }, [])
  return (
    <div className="d-flex flex-column justify-content-start users_container">
      {users.map((user, index) => (
        <UserCard
          user={user}
          setSelectedUserFunction={props.setSelectedCard}
          key={index}
          setHeaderInfo={props.setHeaderInfo}
        />
      ))}
    </div>
  );
};