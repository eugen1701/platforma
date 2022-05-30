import React, {useEffect, useState} from "react";
import {Card, Form, FormControl, FormGroup, FormLabel, Image} from "react-bootstrap";
import './AccountInfo.scss';
import {useAuth} from "../../context/AuthContext";
import {db} from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
export const AccountInfo:React.FC = () => {
    const [userType, setUserType] = useState("");
    const [startDate, setStartDate] = useState("")
    const [editMode, setEditMode] = useState(false);
    let user = useAuth();
    useEffect(() => {
        const getData = async () => {
            const userCollectionRef = collection(db, "users");
            console.log(user?.uid)
            const q = query(userCollectionRef, where("uid", "==", user?.uid));
            try{
                const querySnapShot = await getDocs(q);
                querySnapShot.forEach(doc => {
                    setUserType(doc.data().type);
                    let date = new Date(doc.data().createdAt.seconds*1000);
                    let stringDate = date.toLocaleDateString();
                    setStartDate(stringDate);
                })
            }catch (err) {
                console.log(err);
            }


        }

        getData();
    }, []);

    return (<div>
        <Card>
            <div className="d-flex">
                <Card.Img className="img-thumbnail imgCardProfile" src="open-iconic/img.png" alt="profile-picture"
                          id="profile-picture"/>
                <Card.Body>
                    <Form>
                        <FormGroup>
                            <FormLabel>
                                User email:
                            </FormLabel>
                            <FormControl title="email" value={user?.email!} readOnly/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                User type:
                            </FormLabel>
                            <FormControl title="User type" value={userType} readOnly/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Our user since:
                            </FormLabel>
                            <FormControl title="Registration time" value={startDate} readOnly/>
                        </FormGroup>
                    </Form>
                </Card.Body></div>
        </Card> 
    </div>);
}