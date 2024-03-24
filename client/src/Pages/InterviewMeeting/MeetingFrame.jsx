import React, { useEffect, useState } from "react";
import './styles.css';

const MeetingFrame = () => {
    // State variables
    const [localStream, setLocalStream] = useState(null);
    const [remoteStreams, setRemoteStreams] = useState([]);

    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isAudioMuted, setIsAudioMuted] = useState(false);

    // Component Did Mount
    useEffect(() => {
        initializeWebRTC();
        // Component Will Unmount
        return () => {
            if (localStream) {
                localStream.getTracks().forEach(track => {
                    track.stop();
                });
            }
        };
    }, []);

    // Initialize WebRTC
    const initializeWebRTC = async () => {
        try {
            // Access user media stream with video and audio (including echo cancellation)
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: {
                    echoCancellation: true, // Enable echo cancellation
                }
            });
            setLocalStream(stream);
            const localVideo = document.getElementById('localVideo');
            if (localVideo) {
                localVideo.srcObject = stream;
            }

            const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
            const peerConnection = new RTCPeerConnection(configuration);
            
            // Add local stream to peer connection
            stream.getTracks().forEach(track => {
                peerConnection.addTrack(track, stream);
            });

            // Set up event handler for receiving remote streams
            peerConnection.ontrack = event => {
                setRemoteStreams(prevStreams => [...prevStreams, event.streams[0]]);
            };

            // Offer SDP
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            // Send offer to signaling server (not implemented here)

        } catch (error) {
            console.error("Error accessing the user media stream ", error);
        }
    }

    // Toggle Video
    const toggleVideo = () => {
        setLocalStream(prevStream => {
            prevStream.getTracks().forEach(track => {
                if (track.kind === 'video') {
                    track.enabled = !isVideoMuted;
                }
            });
            setIsVideoMuted(!isVideoMuted);
            return prevStream;
        });
    }

    // Toggle Audio
    const toggleAudio = () => {
        setLocalStream(prevStream => {
            prevStream.getTracks().forEach(track => {
                if (track.kind === 'audio') {
                    track.enabled = !isAudioMuted;
                }
            });
            setIsAudioMuted(!isAudioMuted);
            return prevStream;
        });
    }

    // Render
    return (
        <div className="meeting-frame">
            <div className="video-container">
                <video id="localVideo" autoPlay playsInline muted></video>
                <div className="video-overlay"> You </div>
                <div className="video-controls">
                    <button onClick={toggleVideo}>{isVideoMuted ? 'Turn ON Video' : 'Turn OFF Video'}</button>
                    <button onClick={toggleAudio}>{isAudioMuted ? 'Turn ON Audio' : 'Turn OFF Audio'}</button>
                </div>
            </div>
            <div className="audio-controls">
                {/* Audio controls (mute/unmute) */}
            </div>
            <div className="remote-video-container">
            {remoteStreams.map((stream, index) => (
                <video key={index} autoPlay playsInline></video>
            ))}
        </div>
        </div>
    )
}

export default MeetingFrame;
