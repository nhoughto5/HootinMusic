import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Image } from "react-bootstrap";
import albumArt from "../images/ExitConditions_Art.jpeg"
import styled from "styled-components";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faItunes, faSpotify } from "@fortawesome/free-brands-svg-icons";

const ImageWrapper = styled.div`
  width: 100%;
  padding: 30px 0 20px 0;

  img {
    width: 100%;
  }
`;

const PadTop = styled.div`
  margin-top: 10px;
  padding: 20px;
  background-color: hsla(4, 0%, 16%, 0.8);
  border-radius: 8px;

  h4 {
    margin: 0;
  }
`;

const PromoLink = styled.a`
  color: #fee291;

  &:hover {
    color: #fff8e3;
    text-decoration: none;
  }
`;

const IconLink = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

const ListItem = styled.li`
  margin: 6px 0;
`;

const HeaderList = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
  margin-top: 20px;
  margin-bottom: 0;
  li {
    list-style-type: none;
    margin: 0 10px;
  }
`;

const HeaderLink = styled.a`
  color: rgba(${props => props.color}, 0.8);
  font-size: 1.5rem;

  &:hover, &:active {
    color: rgba(${props => props.color}, 1);
  }
`

const IndexPage = () => (
  <Layout pageInfo={{ pageName: "Home" }}>
    <SEO title="Home" />
    <div>
      <h1><i>Exit Conditions</i>: <b>AVAILABLE NOW!!</b></h1>
      <HeaderList>
        <li>
          <HeaderLink color="29, 185, 84" href="#" aria-label="Link to album on Spotify">
            <FontAwesomeIcon size="2x" icon={faSpotify} className="icon" />
          </HeaderLink>
        </li>
        <li>
          <HeaderLink color="234, 76, 192" href="#" aria-label="Link to album on iTunes">
            <FontAwesomeIcon size="2x" icon={faItunes} className="icon" />
          </HeaderLink>
        </li>
      </HeaderList>
    </div>

    <ImageWrapper>
      <Image src={albumArt}></Image>
    </ImageWrapper>

    <PadTop>
      <h4 className="underline">Press</h4>
      <div className="listWrap">
        <ul>
          <ListItem>
            <PromoLink target="_blank" href="https://commons.bcit.ca/evolution1079/2021/04/29/get-ready-to-hoot-and-holler-may-7th/">
              <IconLink>
                <FontAwesomeIcon icon={faArrowCircleRight} className="icon" />
                Evolution 1079
              </IconLink>
            </PromoLink>
          </ListItem>
        </ul>
      </div>
    </PadTop>
    <PadTop>
      <h5><i>Exit Conditions</i> is my upcoming album. It was recorded at home
        in Vancouver B.C. with the help of a lot of friends, without whom I would be lost:
      </h5>
      <div className="listWrap">
        <ul>
          <ListItem>Brin Porter</ListItem>
          <ListItem>Kevin Brown</ListItem>
          <ListItem>Martha Goddard</ListItem>
          <ListItem>Ian Crowe</ListItem>
        </ul>
      </div>
    </PadTop>

  </Layout >
);

export default IndexPage;
