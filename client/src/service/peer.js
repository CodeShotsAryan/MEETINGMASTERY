class PeerService {
  constructor() {
    if (!PeerService.peer) {
      PeerService.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });
    }
  }

  async getAnswer(offer) {
    try {
      if (PeerService.peer) {
        await PeerService.peer.setRemoteDescription(offer);
        const ans = await PeerService.peer.createAnswer();
        await PeerService.peer.setLocalDescription(new RTCSessionDescription(ans));
        return ans;
      }
    } catch (error) {
      console.error("Error getting answer:", error);
      throw error;
    }
  }

  async setLocalDescription(ans) {
    try {
      if (PeerService.peer) {
        await PeerService.peer.setRemoteDescription(new RTCSessionDescription(ans));
      }
    } catch (error) {
      console.error("Error setting local description:", error);
      throw error;
    }
  }

  async getOffer() {
    try {
      if (PeerService.peer) {
        const offer = await PeerService.peer.createOffer();
        await PeerService.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
      }
    } catch (error) {
      console.error("Error getting offer:", error);
      throw error;
    }
  }
}

export default new PeerService();
