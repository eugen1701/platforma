import React, { FormEvent, useEffect, useState } from "react";
import { MessageForm } from "../../components/message_form/MessageForm";
import { getAuth } from "firebase/auth";
import { useSearchParams } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
  updateDoc,
  doc,
  orderBy,
  arrayUnion,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../../firebase";
import { MessageInbox } from "../../components/messages/MessageInbox";
import { UserCardProps } from "../../components/messages/UserCard";
import { MessageProps } from "../../utils/interfaces/MessageProps";
import { ChatBox } from "../../components/messages/ChatBox";

export const MessagesPage: React.FC = () => {

  const [text, setText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [file, setFile] = useState<File | null>(null);
  const senderId = getAuth().currentUser?.uid;
  const receiver = searchParams.get("to");
  const [selectedUser, setSelectedUser] = useState<string | null>(receiver ?? null);
  const [inboxList, setInboxList] = useState<UserCardProps[] | []>([]);

  const [messages, setMessages] = useState<MessageProps[] | []>([]);
  const getMessagesSelectedCompany = async () => {
    const id =
        senderId! > receiver!
            ? `${senderId! + receiver!}`
            : `${receiver! + senderId!}`;
    const msgRef = collection(db, "messages", id, "chat");
    const q = query(msgRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querSnapshot) => {
      let msg: MessageProps[] = querSnapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          to: docData.to,
          from: docData.from,
          text: docData.text,
          createdAt: docData.createdAt,
        };
      });
      setMessages(msg);
    });
  };
  useEffect(() => {
    console.log("selectedUser is: " + selectedUser)
    if(selectedUser !== null){
      setSearchParams({"to":selectedUser!})
      console.log("ar trebuii mesaje afisate")
      getMessagesSelectedCompany();
    }
  }, [selectedUser])
  useEffect(() => {

    const getCorespondingCompanies = async () => {
      const response = await getDoc(doc(db, "users", senderId!));
      if (response.data()?.type === "normal") {
        let managersApplied = response.data()?.appliedToManager;

        const q = query(
          collection(db, "companies"),
          where("manager", "in", managersApplied)
        );

        const responseCompanies = await getDocs(q);

        const documentUrlPromises = responseCompanies.docs.map((doc) => {
          return getDownloadURL(ref(storage, `logos/${doc.id}`)).then((url) => {
            return {
              id: doc.id,
              url,
            };
          });
        });

        const documentUrls = await Promise.all(documentUrlPromises);

        const loadedData: UserCardProps[] = responseCompanies.docs.map(
          (doc) => {
            const docData = doc.data();

            return {
              urlPhoto: documentUrls.find((e) => e.id === doc.id)?.url ?? "",
              managerName: response.data()?.email ?? "",
              companyName: docData.name ?? "",
              userId:docData.manager ?? "",
              setSelectedUserFunction:setSelectedUser
            };
          }
        );

        setInboxList(loadedData);
        setSelectedUser(loadedData[0].userId)
      }
      else if(response.data()?.type === "employer"){
        const q = query(collection(db, "users"), where("appliedToManager", "array-contains", senderId));
        const responseApplicants = await getDocs(q);

        const documentUrlPromises = responseApplicants.docs.map(doc => {
            return getDownloadURL(ref(storage, `images/${doc.id}`)).then(url => {
              return {
                id: doc.id,
                url
              }

            }, () => {return {
            id:doc.id,
            url: "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            }
            }
        )});

        const documentUrls = await Promise.all(documentUrlPromises);
        const loadedData: UserCardProps[] = responseApplicants.docs.map(doc => {
          const docData = doc.data();
          console.log(docData)

          return {
            urlPhoto: documentUrls.find(e=>e.id === doc.id)?.url ?? "",
            managerName: docData.email ?? "", //TODO: refacto such that it works for applicants the props
            companyName: docData.email ?? "", //TODO: introduce name and put it here
            userId:doc.id ?? "",
            setSelectedUserFunction:setSelectedUser
          }
        })
        console.log(loadedData[0])
        setInboxList(loadedData);
        setSelectedUser(loadedData[0].userId)
      }
    };

    getCorespondingCompanies();
    getMessagesSelectedCompany(); //.then(() => {console.log("messages");console.log(messages);})
  }, []);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id =
      senderId! > receiver!
        ? `${senderId! + receiver!}`
        : `${receiver! + senderId!}`;

    let url;
    if (file) {
      const fileRef = ref(
        storage,
        `files/${new Date().getTime()} - ${file.name}`
      );
      const snap = await uploadBytes(fileRef, file);
      url = await getDownloadURL(ref(storage, snap.ref.fullPath));
    }
    console.log(
      "sender: " +
        senderId +
        "\nreceiver: " +
        receiver +
        "\nid(name of doc): " +
        id +
        "\nmessage: " +
        text
    );
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: senderId,
      to: receiver,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    }).then(() => {
      updateDoc(doc(db, "users", senderId!), {
        appliedToManager: arrayUnion(receiver),
      });
    });
    setText("");
  };
  return (
    <div className="d-flex justify-content-start home_container">
      <MessageInbox inboxList={inboxList} setSelectedCardF2={setSelectedUser}/>
      <div className="d-flex flex-column justify-content-start">
        <ChatBox messages={messages} />
        <MessageForm
          handleSubmit={handleSubmit}
          text={text}
          setText={setText}
          setFile={setFile}
        />
      </div>
    </div>
  );
};
