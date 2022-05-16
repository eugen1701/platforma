import React from "react";
import { OfferCardProps } from "../offer_card/OfferCard";
import { Card } from "react-bootstrap";
import "./OfferCardExtended.scss";

export const OfferCardExtended: React.FC<OfferCardProps> = (props) => {
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
                src={props.urlLogo}
                className="img-thumbnail shadow imgCardExtended"
              />
              <div className="d-flex flex-column justify-content-start">
                <div className="d-flex form-p"><p className="text-bold ">Location: </p><p>{props.location}</p></div>
                <div className="d-flex form-p"><p className="text-bold ">Salary:</p><p>{props.salary}</p></div>
                <div className="d-flex form-p"><p className="text-bold ">Domain:</p><p>{props.domain}</p></div>
                <div className="d-flex form-p"><p className="text-bold ">Company:</p><p>{props.company}</p></div>
              </div>
            </div>
            <Card.Text>{props.description}</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};