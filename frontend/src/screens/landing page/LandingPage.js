import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  useEffect(() => {
    if (userInfo) {
      navigate("/myNotes");
    }
  }, [navigate]);
  return (
    <div className="main">
      <Container>
        <Row>
          <Col>
            <div className="intro-text">
              <div>
                <h1 className="title">Wellcome to Note Zipper</h1>
                <p className="subtitle">One safe place for all your Notes</p>
              </div>
              <div className="buttonContainer">
                <a href="/login">
                  <Button size="lg" className="landingbutton">
                    Login
                  </Button>
                </a>
                <a href="/register">
                  <Button
                    size="lg"
                    className="landingbutton"
                    variant="outline-primary"
                  >
                    Signup
                  </Button>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
