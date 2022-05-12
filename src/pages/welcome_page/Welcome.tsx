import React, { useEffect, useState } from "react";
import "./Welcome.scss";
import { OfferCard } from "../../components/offer_card/OfferCard";
import { OfferCardExtended } from "../../components/offer_card_extended/OfferCardExtended";
import {Button, CardGroup, Dropdown, Form} from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { DomainList } from "../../utils/DomainList";

let offer1 = {
  title: "Software engineer",
  company: "Microsoft",
  domain: "IT",
  description:
    "We build products and features for the Power Platform specializing in business applications, automation, and AI. With a low-code/no-code experience, we bridge the Azure AI world to the Power Platform, empowering our business users to solve real business problems.\n" +
    "We engineer innovative experiences and cloud services our enterprise customers can rely on for their critical processes all over the world.\n ",
  logo: "/dummy/img.png",
  salary: "20-30k",
  location: "Paris, France",
  selected: false,
};
let offer2 = {
  title: "Quality engineer",
  company: "Facebook",
  domain: "IT",
  description:
    "We build products and features for the Power Platform specializing in business applications, automation, and AI. With a low-code/no-code experience, we bridge the Azure AI world to the Power Platform, empowering our business users to solve real business problems.\n" +
    "We engineer innovative experiences and cloud services our enterprise customers can rely on for their critical processes all over the world.\n ",
  logo: "/dummy/img.png",
  salary: "20-30k",
  location: "Paris, France",
  selected: false,
};

export const Welcome: React.FC = () => {
  let dummy = [offer1, offer2];
  const [selectedCard, setSelectedCard] = useState(offer1);
  const [offers, setOffers] = useState([]);
  const [selectedDomainFilter, setSelectedDomainFilter] = useState("");
  const [inputTitleFilter, setInputTitleFilter] = useState("");

  useEffect(() => {
    const docRef = doc(db, "jobOffers", "mY6DgKDr8TDAfWyHgS5e");
    const getData = async () => {
      const data = await getDoc(docRef);
      if (data.exists()) {
        console.log(data.data());
      } else console.log("boule, nu merge");
    };

    getData();
  }, []);

  const handleClickDomainFilter = (domain: string) => {
    setSelectedDomainFilter(domain);
  };

  const filteredData = dummy.filter(el => {
    if(inputTitleFilter ==='') return el;
    else return el.title.toLowerCase().includes(inputTitleFilter)
  })



  return (
    <div className="container-fluid ">
      <div className="row d-flex" id="filter">
        <div id="filter-tag" className="d-flex justify-content-start">
          <div className="d-flex justify-content-center flex-column">
            <img
              src="open-iconic/svg/aperture.svg"
              alt="aperture-filter"
              id="filter-icon"
              className="navbar-toggler-icon"
            />
          </div>
          <h3>
            <span>Filter</span>
          </h3>
          <Dropdown id="domain-filter-dropdown">
            <Dropdown.Toggle className="btn btn-secondary dropdown-toggle">
              Domain
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
              {DomainList.map((domain) => (
                <Dropdown.Item onClick={() => handleClickDomainFilter(domain)}>
                  {domain}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown id="title-filter-dropdown">
            <Dropdown.Toggle className="btn btn-secondary dropdown-toggle">
              Title
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
              <Form.Control className="search" placeholder="Title..." onChange={e => {return setInputTitleFilter(e.target.value)}}></Form.Control>
              <Button className="btn btn-light">
                <div className="d-flex"><img src="open-iconic/svg/search.svg" alt="search-button"/>
                  <h6>Search</h6></div></Button>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="row">
        <CardGroup className="col left-col">
          {filteredData.map((of) => (
            <div onClick={() => setSelectedCard(of)}>
              <OfferCard
                title={of.title}
                description={of.description}
                company={of.company}
                salary={of.salary}
                urlLogo={of.logo}
                location={of.location}
              />
            </div>
          ))}
        </CardGroup>
        <div className="col">
          <OfferCardExtended
            title={selectedCard.title}
            description={selectedCard.description}
            company={selectedCard.company}
            salary={selectedCard.salary}
            urlLogo={selectedCard.logo}
            location={selectedCard.location}
          />
        </div>
      </div>
    </div>
  );
};
