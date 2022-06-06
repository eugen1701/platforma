import React from "react";
import { OfferCard } from "../offer_card/OfferCard";
import { JobInterface } from "../../utils/interfaces/JobInterface";
import {OfferCardInterface} from "../../utils/interfaces/OfferCardInterface";

interface ListCardsProps {
  jobs: OfferCardInterface[];
}

export const ListCards: React.FC<ListCardsProps> = (props) => {
  return (
    <div className="w-50">
      {props.jobs.length !== 0 ? props.jobs.map((job, index: number) => (
        <OfferCard
          title={job.title}
          headMasterUrl={job.headMasterUrl}
          companyId={job.companyId}
          company={job.company}
          managerId={job.managerId}
          id={job.id}
          description={job.description}
          domain={job.domain}
          location={job.location}
          salary={job.salary}
          key={index}
          setSelectedCard={job.setSelectedCard}
        />
      )): <h3>Add your offers first</h3>}
    </div>
  );
};