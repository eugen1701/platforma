import React, {useEffect, useState} from "react";
import {Card, FormText, Image} from "react-bootstrap";
import './OfferCard.scss'
import { OfferCardInterface} from "../../utils/interfaces/OfferCardInterface";

export const OfferCard: React.FC<OfferCardInterface> = (props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Card className="shadow">
      <Card.Header>
        <h4 className="font-monospace text-center">{props.title}</h4>
      </Card.Header>
      <Card.Body className="container h-25 absolute">
        <div className="d-flex card-row">
            <Card.Img
                style={loaded ? {} : {display:"none"}}
              src={props.urlLogo}
              alt={`image${props.company}`}
              className="img-fluid imageCompany"
              onLoad={() => setLoaded(true)}
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