import React, { useEffect, useState } from "react";
import "./Welcome.scss";
import {WelcomeCarousel} from "../../components/welcome_carousel/WelcomeCarousel";
import {useAuth} from "../../context/AuthContext";

export const Welcome: React.FC = () => {
 return (
     <div id="welcome_page">
         <WelcomeCarousel/>
         <div className="d-flex justify-content-center">
             <div className="d-flex flex-column justify-content-start">
                 <div className="d-flex justify-content-center"><h3>Have you lost your job?</h3></div>
             <h2>No problem. You will find your next job here!</h2>
                 <h1>Sign up and let the adventure begin!</h1>
             </div></div>
     </div>
 );
};
