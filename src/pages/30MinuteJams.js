import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ResponsiveVideo from "../components/responsiveVideo";
import { StaticQuery, graphql } from "gatsby";
import { Col, Container, Row } from "react-bootstrap";

const Jams = () => (
    <StaticQuery
        query={graphql`
        query JamsQuery {
          allJamsJson {
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
                <Layout pageInfo={{ pageName: "30MinuteJams" }}>
                    <SEO title="30MinuteJams" keywords={[`gatsby`, `react`, `bootstrap`]} />
                    <h3 className="jams">30 Minute Jams is a series where I give myself 30 minutes to write and record a quick track</h3>
                    <Container fluid className="fadeIn2">
                        {getVideos(data)}
                    </Container>
                </Layout>
            </>
        )}
    />
);

function getVideos(data) {
    const html = [];

    const videos = data.allJamsJson.edges.filter(item => {
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

export default Jams;