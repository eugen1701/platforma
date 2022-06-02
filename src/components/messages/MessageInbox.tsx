import React from "react";
import { UserCard, UserCardProps } from "./UserCard";

interface MessageInboxProps {
  inboxList: UserCardProps[];
  setSelectedCardF2: (str: string | null) => void;
}

export const MessageInbox: React.FC<MessageInboxProps> = (props) => {
  return (
    <div className="d-flex flex-column justify-content-start users_container">
      {props.inboxList.map((company, index) => (
        <UserCard
          urlPhoto={company.urlPhoto}
          companyName={company.companyName}
          managerName={company.managerName}
          userId={company.userId}
          setSelectedUserFunction={props.setSelectedCardF2}
          key={index}

        />
      ))}
    </div>
  );
};