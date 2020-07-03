/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { graphql, Link, StaticQuery } from "gatsby";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Owl from "../images/hootinOwl2Trans.png";
import Navbar from "./navBar";

const Layout = ({ children, pageInfo }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Container fluid className="px-0 main">
          <Image src={Owl} className="bgImage"></Image>
          <Navbar pageInfo={pageInfo} />
          <Row noGutters>
            <Col>
              <Container className="mt-5">
                <main>{children}</main>
              </Container>
            </Col>
          </Row>
        </Container>
        <Container fluid className="px-0">
          <Row noGutters>
            <Col className="footer-col">
              <footer>
                <span>
                  <Link to="https://twitter.com/hootinm" className="link-no-style">
                    <FontAwesomeIcon icon={faTwitter} size="2x" className="icon" />
                  </Link>
                  <Link to="https://www.facebook.com/hootinMusic" className="link-no-style">
                    <FontAwesomeIcon icon={faFacebook} size="2x" className="icon" />
                  </Link>
                  <Link to="https://www.instagram.com/hootinmusic/" className="link-no-style">
                    <FontAwesomeIcon icon={faInstagram} size="2x" className="icon" />
                  </Link>
                </span>
              </footer>
            </Col>
          </Row>
        </Container>
      </>
    )}
  />
);

export default Layout;
