/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import { faFacebook, faInstagram, faTiktok, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { graphql, Link, StaticQuery } from "gatsby";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Owl from "../images/hootinOwl2TransCrop.png";
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
          <Navbar pageInfo={pageInfo} />
          <Image src={Owl} className="bgImage"></Image>
          <Row noGutters>
            <Col>
              <Container style={{ marginBottom: "60px" }} className="mt-5">
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
                  <Link target="_blank" to="https://twitter.com/hootinm" className="link-no-style">
                    <FontAwesomeIcon icon={faTwitter} size="2x" className="icon" />
                  </Link>
                  <Link target="_blank" to="https://www.facebook.com/hootinMusic" className="link-no-style">
                    <FontAwesomeIcon icon={faFacebook} size="2x" className="icon" />
                  </Link>
                  <Link target="_blank" to="https://www.instagram.com/hootinmusic/" className="link-no-style">
                    <FontAwesomeIcon icon={faInstagram} size="2x" className="icon" />
                  </Link>
                  <Link target="_blank" to="https://www.tiktok.com/@nhoughton" className="link-no-style">
                    <FontAwesomeIcon icon={faTiktok} size="2x" className="icon" />
                  </Link>
                  <Link target="_blank" to="https://www.youtube.com/channel/UClRvVkAi9QhJU2Y2-bpo3jQ" className=" link-no-style">
                    <FontAwesomeIcon icon={faYoutube} size="2x" className="icon" />
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
