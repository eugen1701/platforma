import React from "react";
import {Carousel} from "react-bootstrap";

export const WelcomeCarousel:React.FC = () => {
    return (
        <div id="welcome_carousel">
            <Carousel fade>
                <Carousel.Item>
                    <img src="s3.jpg" alt="slide1" className="d-block w-100 imgCarousel"/>
                    <Carousel.Caption>
                        <h3>A place where you can find your dream job</h3>
                        <p className="">If you are searching for a new job, this is the right place for you</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="s2.jpg" alt="slide1" className="d-block w-100 imgCarousel"/>
                    <Carousel.Caption>
                        <h3>Find what is best for you</h3>
                        <p className="">Are you thinking that you can find a better job for you? Here you will find the answer</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="s1.jpg" alt="slide3" className="d-block w-100 imgCarousel"/>
                    <Carousel.Caption>
                        <h3>We are here to help you</h3>
                        <p>We provide for you job offers from which you can pick the best one for you</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}