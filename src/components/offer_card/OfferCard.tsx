import React from "react";

interface OfferCardProps {
    title: string,
    company?: string,
    description?: string,
    urlLogo?: string,
    salary?: string
}

export const OfferCard:React.FC<OfferCardProps> = (props) => {

    return (
      <div className="container">
          <div className="row">
              <div className="col">
                  <img src={props.urlLogo} alt={`image${props.company}`}/>
              </div>
              <div className="col">

              </div>
          </div>
      </div>
    );
}