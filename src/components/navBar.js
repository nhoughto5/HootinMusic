import { Link } from "gatsby";
import React from "react";
import { Image, Nav, Navbar } from "react-bootstrap";
import Owl2 from "../images/hootinOwl2.png";

const CustomNavbar = ({ pageInfo }) => {
  return (
    <Navbar variant="dark" expand="lg" id="site-navbar">
      <Link to="/" className="link-no-style navTitle">
        <Navbar.Brand>
          <div className="circleBg">
            <Image src={Owl2} className="navImage"></Image>
          </div>
        </Navbar.Brand>
        <Navbar.Brand as="span">Hootin Music</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto float-right" activeKey={pageInfo && pageInfo.pageName}>
          <Link to="/videos" className="link-underline linkStyle">
            <Nav.Link as="span" eventKey="videos">
              Video
            </Nav.Link>
          </Link>
          <Link to="/streams" className="link-underline linkStyle">
            <Nav.Link as="span" eventKey="streams">
              Streams
            </Nav.Link>
          </Link>
          <Link to="/30MinuteJams" className="link-underline linkStyle">
            <Nav.Link as="span" eventKey="jams">
              30 Minute Jams
            </Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
};

export default CustomNavbar;
