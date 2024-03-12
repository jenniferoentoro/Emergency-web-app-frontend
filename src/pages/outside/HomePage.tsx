import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "../../components/outside/NavBar";
import { Link } from "react-router-dom";
import "animate.css";
import "../../tailwind.css";

import Loader from "../../components/outside/Loader";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="cover-background color-background playfair-font">
          <Nav />
          <Container fluid>
            <div className="row mt-20">
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                <div className="mr-10 md:mr-0 ml-10 md:ml-20 text-center sm:mt-0 lg:mt-16">
                  <h1 className="animate__animated animate__pulse  text-6xl font-bold">
                    Welcome to{" "}
                    <span className="text-[#a11d17]">
                      Dutch Crisis Support!
                    </span>
                  </h1>
                  <p className="animate__animated animate__lightSpeedInLeft text-xl mt-4 text-grey">
                    In times of uncertainty and crisis, it's essential to have a
                    reliable support system in place. We understand the
                    importance of community, collaboration, and preparedness,
                    which is why we've created Dutch Crisis Support—a platform
                    designed to empower unity in the Netherlands during
                    emergencies.
                  </p>
                  <Link to="/login">
                    <button className="animate__animated animate__fadeIn rounded-full bg-[#bc5c54] text-white px-20 tracking-wider py-2 mt-2">
                      Sign In
                    </button>
                  </Link>
                  <br />
                  <Link to="/register">
                    <button className="animate__animated animate__fadeIn rounded-full bg-[#c97d79] text-white px-20 tracking-wider py-2 mt-2">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                <div className="text-center">
                  <img
                    src="/images/homepage.png"
                    className="animate__animated animate__fadeInRight d-inline-block align-top w-auto"
                    alt="Home Logo"
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}

export default HomePage;
