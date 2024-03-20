import React, { useState, useEffect, useRef } from 'react';

const VideoConference = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    // Function to initialize user media
    const initUserMedia = async () => {
      try {
        // Get user media (camera and microphone)
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        
        // Display local video stream
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        // Save local stream to state
        setLocalStream(stream);
      } catch (error) {
        console.error('Error accessing user media:', error);
      }
    };

    // Call the function to initialize user media
    initUserMedia();

    // Clean up function to stop local stream when component unmounts
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      {/* Local video */}
      <video ref={localVideoRef} autoPlay muted playsInline className="local-video"></video>
      
      {/* Remote video */}
      {remoteStream && <video ref={remoteVideoRef} autoPlay playsInline className="remote-video"></video>}
    </div>
  );
};

export default VideoConference;
