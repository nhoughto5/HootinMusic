import React from "react";

const ResponsiveVideo = ({ videoInfo }) => {
  return (
    <div>
      <h1 className="videoTitle">{videoInfo.name}</h1>
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
