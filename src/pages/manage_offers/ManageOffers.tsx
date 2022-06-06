import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { JobInterface } from "../../utils/interfaces/JobInterface";
import { ListCards } from "../../components/list_card/ListCards";
import {OfferEdit} from "../../components/offer_edit/OfferEdit";
import {OfferCardInterface} from "../../utils/interfaces/OfferCardInterface";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const ManageOffers: React.FC = () => {
  const [jobs, setJobs] = useState<OfferCardInterface[]>([]);
  const [selectedCard, setSelectedCard] = useState<OfferCardInterface|null>(null);
  const navigation = useNavigate();


  useEffect(() => {
    const user = getAuth();
    const jobOffersRef = collection(db, "jobOffers");
    const q = query(
      jobOffersRef,
      where("managerId", "==", user.currentUser?.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const loadedOffers: OfferCardInterface[] = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        const id = doc.id;
        console.log("id is: " + id);
        return {
          title: docData.title ?? "",
          company: docData.company ?? "",
          companyId: docData.companyId ?? "",
          managerId: docData.managerId ?? "",
          domain: docData.domain ?? "",
          description: docData.description ?? "",
          headMasterUrl: docData.headMasterURL ?? "",
          salary: docData.salary ?? "",
          location: docData.location ?? "",
          id: id ?? "",
          setSelectedCard:setSelectedCard,
        };
      });
      setJobs(loadedOffers);
      setSelectedCard(loadedOffers[0]);
      console.log("useEfect manageOffers")
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="">
      <h1>Manage your company</h1>
      <Button onClick={() => navigation("/create-offer")}>Add job offer</Button>
      <div className="d-flex">
        <ListCards jobs={jobs}/>
        <OfferEdit title={selectedCard?.title!}
                   description={selectedCard?.description}
                   company={selectedCard?.company}
                   salary={selectedCard?.salary}
                   headMasterUrl={selectedCard?.headMasterUrl}
                   location={selectedCard?.location}
                   domain={selectedCard?.domain}
                   managerId={selectedCard?.managerId}
                   companyId={selectedCard?.companyId}
                   id={selectedCard?.id}
        />
      </div>
    </div>
  );
};
