import React, {useEffect, useState} from "react";
import {Card, CardImg} from "react-bootstrap";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase";

export interface UserCardProps {
    urlPhoto:string;
    companyName:string;
    managerName:string;
    isOnline?:boolean;
    userId:string;
    setSelectedUserFunction:(str:string|null) => void;
}
export const UserCard:React.FC<UserCardProps> = (props) =>{
    //TODO:style the page
    const [isReceiverOnline, setIsReceiverOnline] = useState<boolean>(false);
    useEffect(() => {
        const getReceiverData = async () => {
            const response = await getDoc(doc(db, "users", props.userId!));
            const responseData = response.data();
            setIsReceiverOnline(responseData?.isOnline);
        }
        getReceiverData().then();
    }, []);
    return <div onClick={() => {props.setSelectedUserFunction(props.userId!);console.log("setam selecteduser cu " + props.userId)}}><Card>
        <Card.Body>
            <div className="d-flex messages_user">
                <div>
                    <CardImg
                        src={props.urlPhoto}
                        alt="profileCompany"
                    />
                </div>
                <div className="d-flex flex-column justify-content-start">
                    <div>
                        <h4>{props.companyName}</h4>
                    </div>
                    <div>
                        <h5>{props.managerName}</h5>
                    </div>
                    <div
                        className={`user_status ${isReceiverOnline ? "online" : "offline"}`}
                    ></div>
                </div>
            </div>
        </Card.Body>
    </Card>;</div>
}