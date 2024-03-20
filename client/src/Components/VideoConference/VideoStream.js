import React from 'react';

const VideoStream = ({ stream }) => {
  return <video srcObject={stream} autoPlay playsInline className="remote-video"></video>;
};

export default VideoStream;
