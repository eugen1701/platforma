import React, {useMemo, useState} from "react";
import { OfferCardInterface } from '../../utils/interfaces/OfferCardInterface';
import {Button, Card} from "react-bootstrap";
import "./OfferCardExtended.scss";
import {useNavigate} from "react-router-dom";
import {arrayUnion, doc, getDoc, updateDoc} from "firebase/firestore";
import {db, storage} from "../../firebase";
import {getAuth} from "firebase/auth";
import {useAuth} from "../../context/AuthContext";
import Camera from "../../svg/Camera";
import Delete from "../../svg/Delete";
import {deleteObject, ref} from "firebase/storage";

export const OfferCardExtended: React.FC<OfferCardInterface> = (props) => {
  let navigation = useNavigate();
  const currentUser = useAuth();
  const [userType2, setUserType2] = useState<string>();
  const handleApplyButton = () => {
    const updateData = async() => {
      const user = getAuth().currentUser;
      await updateDoc(doc(db, "users", user?.uid!), {"appliedToCompany": arrayUnion(props.companyId)})
    }
    updateData();
    navigation(`/messages?to=${props.managerId}`)
  }
  const userType = useMemo(()=>{
    if(currentUser){
      let type;
      getDoc(doc(db, "users", currentUser?.uid!)).then((r) => {
        type = r.data()?.type;
        setUserType2(type)
      });
      return type;
    }
    return "normal"
  }, [currentUser])


  return (
    <div id="extended-card">
      <Card className="shadow">
        <Card.Header>
          <h3>{props.title}</h3>
        </Card.Header>
        <Card.Body className="d-flex">
          <div className="d-flex flex-column">
            <div className="d-flex">
              <Card.Img
                src={props.headMasterUrl}
                className="img-thumbnail shadow imgCardExtended"
              />
              <div className="d-flex justify-content-around">
                <div className="d-flex flex-column justify-content-start">
                  <div className="d-flex form-p"><p className="text-bold ">Location: </p><p>{props.location}</p></div>
                  <div className="d-flex form-p"><p className="text-bold ">Salary:</p><p>{props.salary}</p></div>
                  <div className="d-flex form-p"><p className="text-bold ">Domain:</p><p>{props.domain}</p></div>
                  <div className="d-flex form-p"><p className="text-bold ">Company:</p><p>{props.company}</p></div>
                </div>
                {userType2 === "normal" ? <div className="d-flex flex-column justify-content-center"><Button variant="info" onClick={handleApplyButton}>Apply</Button></div>:<></>}
              </div>
            </div>
            <Card.Text>{props.description}</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};