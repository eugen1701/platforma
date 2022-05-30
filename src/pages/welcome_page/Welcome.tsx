import React, { useEffect, useState } from "react";
import "./Welcome.scss";
import {WelcomeCarousel} from "../../components/welcome_carousel/WelcomeCarousel";
import {useAuth} from "../../context/AuthContext";

export const Welcome: React.FC = () => {
 return (
     <div id="welcome_page">
         <WelcomeCarousel/>

     </div>
 );
};
