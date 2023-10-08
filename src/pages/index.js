import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Image } from "react-bootstrap";
import banner from "../images/AptitudeNow.png"
import styled from "styled-components";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faItunes, faSpotify } from "@fortawesome/free-brands-svg-icons";

const ImageWrapper = styled.div`
  width: 100%;
  margin: 30px 0 20px 0;

  img {
    width: 100%;
  }

  &:hover {
    opacity: 0.9;
    transform: scale(1.01);
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

const ImageLink = styled.a`
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

const HeaderLink = styled(PromoLink)`
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
      <h1><b><i>Aptitude - Featuring Sandy Beach</i> - Out Now!</b></h1>
      {/* <h5>Recently, I've been lucky enough to get to work with the good people at <PromoLink target="_blank" href="http://www.theanimalfarm.co.uk/" aria-label="Link to the Animal Farm">The Animal Farm</PromoLink>, putting together new ideas and strategies.</h5> */}
      <h5>
        My fourth single <i>Aptitude</i> is finally here! This one features my really good friend Sandy Beach who is an incredible rapper. Aptitude is about two toxic people in a relationship, accusing the other of being toxic.
      </h5>
      <hr />
      {/* <h2><i>Exit Conditions</i>: <b>AVAILABLE NOW!!</b></h2> */}
      <HeaderList>
        <li>
          <HeaderLink target="_blank" color="29, 185, 84" href="https://open.spotify.com/artist/0ncw0A7qZrFgdErqI7c1SU" aria-label="Link to album on Spotify">
            <FontAwesomeIcon size="2x" icon={faSpotify} className="icon" />
          </HeaderLink>
        </li>
        <li>
          <HeaderLink target="_blank" color="234, 76, 192" href="https://music.apple.com/us/artist/hootin/1540209406" aria-label="Link to album on iTunes">
            <FontAwesomeIcon size="2x" icon={faItunes} className="icon" />
          </HeaderLink>
        </li>
      </HeaderList>
    </div>

      <ImageLink target="_blank" href="https://youtu.be/078GIeL75BE">
    <ImageWrapper>
        <Image src={banner}></Image>
    </ImageWrapper>
      </ImageLink>

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
            <PromoLink target="_blank" href="https://dropthespotlight.com/interview-with-hootin/">
              <IconLink>
                <FontAwesomeIcon icon={faArrowCircleRight} className="icon" />
                Drop The Spotlight
              </IconLink>
            </PromoLink>
            <PromoLink target="_blank" href="https://www.volatileweekly.com/p/interview-hootin?s=w">
              <IconLink>
                <FontAwesomeIcon icon={faArrowCircleRight} className="icon" />
                Volatile Weekly
              </IconLink>
            </PromoLink>
            <PromoLink target="_blank" href="https://www.nataliezworld.com/2022/05/hootin-discusses-much-on-himself-and.html">
              <IconLink>
                <FontAwesomeIcon icon={faArrowCircleRight} className="icon" />
                Nataliez World
              </IconLink>
            </PromoLink>
            <PromoLink target="_blank" href="https://themusicalhype.com/getting-to-know-hootin-interview/">
              <IconLink>
                <FontAwesomeIcon icon={faArrowCircleRight} className="icon" />
                The Musical Hype
              </IconLink>
            </PromoLink>
            <PromoLink target="_blank" href="https://www.on-magazine.co.uk/arts/music/bands-artists/hootin-interview/">
              <IconLink>
                <FontAwesomeIcon icon={faArrowCircleRight} className="icon" />
                On Magazine
              </IconLink>
            </PromoLink>
            <PromoLink target="_blank" href="https://thephoenixremix.com/2022/09/09/playing-the-favourite-interview-hootin">
              <IconLink>
                <FontAwesomeIcon icon={faArrowCircleRight} className="icon" />
                The Phoenix Remix
              </IconLink>
            </PromoLink>
          </ListItem>
        </ul>
      </div>
    </PadTop>
    <PadTop>
      <h5><i>Exit Conditions</i> is my latest album, released May of 2021. It was recorded at home
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
