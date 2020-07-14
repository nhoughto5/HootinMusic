import React from "react";
import styled from "styled-components";
import colors from "../styles/_variables.scss";

const VideoTitle = styled.h1`
  color: ${colors.primary};
`;

const ResponsiveVideo = ({ videoInfo }) => {
  return (
    <div>
      <VideoTitle>{videoInfo.name}</VideoTitle>
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          className="embed-responsive-item"
          src={videoInfo.src}
          frameborder="0"
          title={videoInfo.name}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default ResponsiveVideo;
