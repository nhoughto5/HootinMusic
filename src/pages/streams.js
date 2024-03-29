import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ResponsiveVideo from "../components/responsiveVideo";
import { StaticQuery, graphql } from "gatsby";

const StreamPage = () => (
  <StaticQuery
    query={graphql`
      query StreamsQuery {
        allStreamsJson {
          edges {
            node {
              name
              src
              enabled
              sortOrder
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Layout pageInfo={{ pageName: "streams" }}>
          <SEO title="Streams" keywords={[`gatsby`, `react`, `bootstrap`]} />
          <Container fluid className="fadeIn2">
            {getStreams(data)}
          </Container>
        </Layout>
      </>
    )}
  />
);

function getStreams(data) {
  const html = [];

  const videos = data.allStreamsJson.edges.filter(item => {
    return item.node.enabled;
  });

  videos.sort(function (a, b) {
    return a.node.sortOrder - b.node.sortOrder;
  });

  const len = videos.length;

  for (let i = 0; i < len - 1; i += 2) {
    html.push(
      <Row>
        <Col md={6}>
          <ResponsiveVideo videoInfo={videos[i].node}></ResponsiveVideo>
        </Col>
        <Col md={6}>
          <ResponsiveVideo videoInfo={videos[i + 1].node}></ResponsiveVideo>
        </Col>
      </Row>
    );
    html.push(<hr></hr>);
  }

  // Add the last one if there are an odd number of videos
  if (len % 2 === 1) {
    html.push(
      <Row>
        <Col md={6}>
          <ResponsiveVideo videoInfo={videos[len - 1].node}></ResponsiveVideo>
        </Col>
      </Row>
    );
  }
  return html;
}

export default StreamPage;
