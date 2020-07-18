import React from "react";
import styled from "styled-components";
import colors from "../styles/_variables.scss";

const VideoTitle = styled.h1`
  color: ${colors.primary};
  white-space: nowrap;
  overflow: hidden;
  text-size: 2.5vw;
  text-overflow: ellipsis;
`;

const ResponsiveVideo = ({ videoInfo }) => {
  return (
    <div>
      <VideoTitle>{videoInfo.name}</VideoTitle>
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          className="embed-responsive-item"
          src={videoInfo.src}
          frameBorder="0"
          title={videoInfo.name}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default ResponsiveVideo;
