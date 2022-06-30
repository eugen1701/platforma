import React, {FormEvent, useEffect, useMemo, useState} from "react";
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
  getDoc, setDoc,
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
  const [searchParams, setSearchParams] = useSearchParams(); //it keeps the id of the manager/user but not the company
  const [file, setFile] = useState<File | null>(null);
  const senderId = getAuth().currentUser?.uid!;
  const receiver = useMemo(() => searchParams.get("to"), [searchParams]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [headerInfo, setHeaderInfo] = useState<string|null>("")

  useEffect(() => {
    if (selectedUser !== null) {
      setSearchParams({"to":selectedUser!})
    }
  }, [selectedUser, setSearchParams])

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
      media: url ?? "",
    }).then(() => {
      updateDoc(doc(db, "users", senderId!), {
        appliedToManager: arrayUnion(receiver),
      });
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: senderId,
      to: receiver,
      createdAt: Timestamp.fromDate(new Date()),
      media: url ?? "",
      unread: true,
    })
    setText("");
  };
  return (
    <div className="d-flex justify-content-center">
      <MessageInbox setSelectedCard={setSelectedUser} setHeaderInfo={setHeaderInfo} selectedUserId={receiver!}/>
      <div className="d-flex flex-column justify-content-start">
        <div><h3>{headerInfo}</h3></div><br/>{/*TODO: set the proper name*/}
        <ChatBox currentUserId={senderId} targetUserId={receiver} />
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
