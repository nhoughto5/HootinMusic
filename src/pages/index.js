import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ResponsiveVideo from "../components/responsiveVideo";
import { YouStingy, Disappear, LeakingPen, OldHorrors } from "../content/videos";

const IndexPage = () => (
  <Layout pageInfo={{ pageName: "index" }}>
    <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
    <Container fluid className="fadeIn">
      <Row>
        <Col md={6}>
          <ResponsiveVideo videoInfo={YouStingy}></ResponsiveVideo>
        </Col>
        <Col md={6}>
          <ResponsiveVideo videoInfo={Disappear}></ResponsiveVideo>
        </Col>
      </Row>
      <Row>
        <hr></hr>
      </Row>
      <Row>
        <Col md={6}>
          <ResponsiveVideo videoInfo={LeakingPen}></ResponsiveVideo>
        </Col>
        <Col md={6}>
          <ResponsiveVideo videoInfo={OldHorrors}></ResponsiveVideo>
        </Col>
      </Row>
    </Container>
  </Layout>
);

export default IndexPage;
