import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Dashboard.scss";
import { OfferCard } from "../../components/offer_card/OfferCard";
import { OfferCardExtended } from "../../components/offer_card_extended/OfferCardExtended";
import { Button, CardGroup, Dropdown, Form } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase";
import { DomainList } from "../../utils/DomainList";
import { storage } from "../../firebase";
import { OfferCardInterface} from "../../utils/interfaces/OfferCardInterface";

export const Dashboard: React.FC = () => {
    const [data, setData] = useState<Array<OfferCardInterface>>([]);
    const [selectedCard, setSelectedCard] = useState<OfferCardInterface | null>(null);
    const [selectedDomainFilter, setSelectedDomainFilter] = useState("");
    const [inputTitleFilter, setInputTitleFilter] = useState("");

    useEffect(() => {
        const getData = async () => {
            const jobOffersCollectionRef = collection(db, "jobOffers");
            const querySnapShot = await getDocs(jobOffersCollectionRef);

            const documentUrlPromises = querySnapShot.docs.map(doc => {
                return getDownloadURL(ref(storage, `images/${doc.id}`))
                    .then((url) => {
                        return {
                            id: doc.id,
                            url
                        }
                    })
            })

            const documentUrls = await Promise.all(documentUrlPromises)

            const loadedData: OfferCardInterface[] = querySnapShot.docs.map(doc => {
                const docData = doc.data()

                return {
                    title: docData.title,
                    description: docData.description ?? '',
                    domain: docData.domain ?? '',
                    urlLogo: documentUrls.find(e => e.id === doc.id)?.url ?? '',
                    location: docData.location ?? '',
                    company: docData.company ?? '',
                    salary: docData.salary ?? '',
                    companyId:docData.companyId ?? '',
                    managerId:docData.managerId ?? ''
                }
            })

            setData(loadedData);
            setSelectedCard(loadedData[0])
            console.log(loadedData);
        };

        getData();
    }, []);

    const handleClickDomainFilter = (domain: string) => {
        console.log("The domain is: " + domain)
        setSelectedDomainFilter(domain);
    };

    const filteredData = data.filter((el) => {
        if (inputTitleFilter === "" && selectedDomainFilter === "") return el;
        else{
            const elementToFilter = el.title.toLowerCase().includes(inputTitleFilter);
            if(selectedDomainFilter !== "")
                if(selectedDomainFilter === el.domain)
                    return true;
            return elementToFilter;
        }
    });

    return (
        <div className="container-fluid ">
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
                                <Dropdown.Item className="se" onClick={() => handleClickDomainFilter(domain)}>
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
                            />
                            <Button className="btn btn-light">
                                <div className="d-flex">
                                    <img src="open-iconic/svg/search.svg" alt="search-button" />
                                    <h6>Search</h6>
                                </div>
                            </Button>
                        </Dropdown.Menu>
                    </Dropdown>
            </div>
            <div className="row">
                <CardGroup className="col left-col">
                    {filteredData.map((of, i) => (
                        <div onClick={() => setSelectedCard(of)}>
                            <OfferCard
                                key={i}
                                title={of.title}
                                description={of.description}
                                company={of.company}
                                salary={of.salary}
                                urlLogo={of.urlLogo}
                                location={of.location}
                                domain={of.domain}
                                managerId={of.managerId}
                                companyId={of.companyId}
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
                        domain={selectedCard?.domain}
                        managerId={selectedCard?.managerId}
                        companyId={selectedCard?.companyId}
                    />
                </div>
            </div>
        </div>
    );
};
