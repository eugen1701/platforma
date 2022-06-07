import React, {useEffect, useState} from "react";
import {MessageProps} from "../../utils/interfaces/MessageProps";
import {Message} from "./Message";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../../firebase";

interface ChatBoxProps {
    currentUserId: string | null;
    targetUserId: string | null;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ currentUserId, targetUserId }) => {
  const [messages, setMessages] = useState<MessageProps[]>([])

  useEffect(() => {
      if (!currentUserId || !targetUserId) {
          return;
      }

      const chatId = currentUserId > targetUserId
          ? currentUserId + targetUserId
          : targetUserId + currentUserId;

      const msgRef = collection(db, "messages", chatId, "chat");
      const q = query(msgRef, orderBy("createdAt", "asc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const msg: MessageProps[] = querySnapshot.docs.map((doc) => {
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

      return () => {
          unsubscribe();
      };
  }, [currentUserId, targetUserId]);

  return (
    <div className="d-flex flex-column justify-content-start messages" style={{maxHeight:"650px"}}> {/*TODO: set the proper max height*/}
      {messages.map((message, index) => {
        return (
          <Message
            createdAt={message.createdAt}
            from={message.from}
            text={message.text}
            to={message.to}
            key={index}
          />
        );
      })}
    </div>
  );
};