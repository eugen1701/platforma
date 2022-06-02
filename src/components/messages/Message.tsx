import React, {RefObject, useEffect, useRef} from "react";
import {MessageProps} from "../../utils/interfaces/MessageProps";
import Moment from "react-moment";
import {Timestamp} from "firebase/firestore";
import {getAuth} from "firebase/auth";


export const Message:React.FC<MessageProps> = (props) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [props]);
    return <div className={`message_wrapper ${props.from === getAuth().currentUser?.uid ? "own" : ""}`}
    ref={scrollRef}>
        <p className={props.from === getAuth().currentUser?.uid ? "me text-white" : "friend text-white"}>
            {props.media ? <img src={props.media} alt={props.text}/> : null}
            {props.text}
            <br/>
            <small>
                <Moment fromNow>{new Timestamp(props.createdAt.seconds, props.createdAt.nanoseconds).toDate()}</Moment>
            </small>
        </p>
    </div>
}