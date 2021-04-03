import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Image } from "react-bootstrap";
import albumArt from "../images/ExitConditions_Art.jpeg"
import styled from "styled-components";

const ImageWrapper = styled.div`
  width: 100%;

  img {
    width: 100%;
  }
`;

const IndexPage = () => (
  <Layout pageInfo={{ pageName: "Home" }}>
    <SEO title="Home" />

    <h1>Upcoming Album: <i>Exit Conditions</i></h1>
    <h2>Release Date: TBA</h2>

    <ImageWrapper>
      <Image src={albumArt}></Image>
    </ImageWrapper>
    <h4><i>Exit Conditions</i> is my upcoming album. It was recorded at home
      in Vancouver B.C. with the help of a lot of friends, without whom I would be lost:
    </h4>

    <div className="listWrap">
      <ul>
        <li>Brin Porter</li>
        <li>Kevin Brown</li>
        <li>Martha Goddard</li>
        <li>Ian Crowe</li>
      </ul>
    </div>

  </Layout >
);

export default IndexPage;
