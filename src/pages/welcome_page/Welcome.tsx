import React, { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";
import "./Welcome.scss";
import { OfferCard } from "../../components/offer_card/OfferCard";
import { OfferCardExtended } from "../../components/offer_card_extended/OfferCardExtended";
import { Button, CardGroup, Dropdown, Form } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase";
import { DomainList } from "../../utils/DomainList";
import { storage } from "../../firebase";
import { OfferCardProps } from "../../components/offer_card/OfferCard";

let offer1 = {
  title: "Software engineer",
  company: "Microsoft",
  domain: "IT",
  description:
    "We build products and features for the Power Platform specializing in business applications, automation, and AI. With a low-code/no-code experience, we bridge the Azure AI world to the Power Platform, empowering our business users to solve real business problems.\n" +
    "We engineer innovative experiences and cloud services our enterprise customers can rely on for their critical processes all over the world.\n ",
  urlLogo: "/dummy/img.png",
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
  urlLogo: "/dummy/img.png",
  salary: "20-30k",
  location: "Paris, France",
  selected: false,
};

export const Welcome: React.FC = () => {
  const [isPending, startTransition] = useTranslation();
  const [data, setData] = useState<Array<OfferCardProps>>([]);
  const [selectedCard, setSelectedCard] = useState<OfferCardProps | null>(null);
  const [offers, setOffers] = useState([]);
  const [selectedDomainFilter, setSelectedDomainFilter] = useState("");
  const [inputTitleFilter, setInputTitleFilter] = useState("");

  useEffect(() => {
    const getData = async () => {
      const jobOffersCollectionRef = collection(db, "jobOffers");
      const querySnapShot = await getDocs(jobOffersCollectionRef);
      const loadedData = Array<OfferCardProps>();
      const getEachOffer = async () => { // i think this one can be excluded and put its code just out of it
        querySnapShot.forEach((doc) => {
          let offer = {} as OfferCardProps;

          offer.title = doc.data().title;
          try {
            offer.description = doc.data().description;
            // offer.company = doc.data().company;
            offer.domain = doc.data().domain;
          } catch (error) {
            console.log(error);
          }
          getDownloadURL(ref(storage, `images/${doc.id}`))
          .then((url) => {
          offer.urlLogo = url;
          })
          loadedData.push(offer);
        });
      }
      await getEachOffer();
      setData(loadedData);
      console.log(data);
    };
    getData();
  }, []);

  const handleClickDomainFilter = (domain: string) => {
    setSelectedDomainFilter(domain);
  };

  const filteredData = data.filter((el) => {
    if (inputTitleFilter === "") return el;
    else return el.title.toLowerCase().includes(inputTitleFilter);
  });

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
              <Form.Control
                className="search"
                placeholder="Title..."
                onChange={(e) => {
                  return setInputTitleFilter(e.target.value);
                }}
              ></Form.Control>
              <Button className="btn btn-light">
                <div className="d-flex">
                  <img src="open-iconic/svg/search.svg" alt="search-button" />
                  <h6>Search</h6>
                </div>
              </Button>
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
                urlLogo={of.urlLogo}
                location={of.location}
              />
            </div>
          ))}
        </CardGroup>
        <div className="col">
          <OfferCardExtended
            title={selectedCard?.title!}
            description={selectedCard?.description}
            company={selectedCard?.company}
            salary={selectedCard?.salary}
            urlLogo={selectedCard?.urlLogo}
            location={selectedCard?.location}
          />
        </div>
      </div>
    </div>
  );
};
