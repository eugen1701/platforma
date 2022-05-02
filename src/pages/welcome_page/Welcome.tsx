import React from "react";
import "./Welcome.scss"
import {OfferCard} from "../../components/offer_card/OfferCard";

let offer1 = {
    "Title" : "Software engineer",
    "Company" : "Microsoft",
    "Description" : "We build products and features for the Power Platform specializing in business applications, automation, and AI. With a low-code/no-code experience, we bridge the Azure AI world to the Power Platform, empowering our business users to solve real business problems.\n" +
        "We engineer innovative experiences and cloud services our enterprise customers can rely on for their critical processes all over the world.\n ",
    "Logo" : "/dummy/img.png",
    "Salary" : "20-30k"
};
let offer2 = {
    "Title" : "Quality engineer",
    "Company" : "Facebook",
    "Description" : "We build products and features for the Power Platform specializing in business applications, automation, and AI. With a low-code/no-code experience, we bridge the Azure AI world to the Power Platform, empowering our business users to solve real business problems.\n" +
        "We engineer innovative experiences and cloud services our enterprise customers can rely on for their critical processes all over the world.\n ",
    "Logo" : "../../assets/dummy/img.png",
    "Salary" : "20-30k"
}
let dummy = [offer1, offer2];

export const Welcome:React.FC = () => {
    return(
        <div className="container-fluid ">
            <div className="row">
                <div className="col left-col">
                    <OfferCard title={offer1.Title} description={offer1.Description} company={offer1.Company} salary={offer1.Salary} urlLogo={offer1.Logo}/>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                </div>
                <div className="col">
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                    <h1>Card</h1>
                </div>
            </div>
        </div>
    );
}