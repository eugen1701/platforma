import React from "react";
import {MessageProps} from "../../utils/interfaces/MessageProps";
import {Message} from "./Message";

interface ChatBoxProps {
    messages:MessageProps[];
}
export const ChatBox:React.FC<ChatBoxProps> = (props) => {

    return <div className="d-flex flex-column justify-content-start messages">
        {props.messages.map((message, index) => {
            return (<Message createdAt={message.createdAt} from={message.from} text={message.text} to={message.to} key={index}/>);
        })}
    </div>;
}