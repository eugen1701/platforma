import React, {useState} from "react";
import {Card, FormText, Image} from "react-bootstrap";
import './OfferCard.scss'

export interface OfferCardProps {
  title: string;
  company?: string;
  domain?: string;
  description?: string;
  urlLogo?: string;
  salary?: string;
  location?: string;
  selected?:boolean;
}

export const OfferCard: React.FC<OfferCardProps> = (props) => {
  const [selected, setSelected] = useState(false);
  function onClickSelected() {
    setSelected(true);
    console.log(props.title+"is selected");
  }
  return (
    <Card className="shadow" onClick={onClickSelected}
    >
      <Card.Header>
        <h4 className="font-monospace text-center">{props.title}</h4>
      </Card.Header>
      <Card.Body className="container h-25 absolute">
        <div className="d-flex card-row">
            <Card.Img
              src={props.urlLogo}
              alt={`image${props.company}`}
              className="img-fluid imageCompany"
            />
          <div className="d-flex flex-column">
            <FormText className="form-text ifToLongPut3Dots">
              {props.description}
            </FormText>
            <div className="d-flex locationdiv">
              <div className="">
                <Image className="navbar-toggler-icon" src="open-iconic/svg/map-marker.svg" alt="map-marker" />
              </div>
              <p>{props.location}</p>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};