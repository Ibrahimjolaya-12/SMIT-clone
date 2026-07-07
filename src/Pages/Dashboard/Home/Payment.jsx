import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import video from "../../../assets/vid.mp4"
const Payment = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const steps = [
    { id: 1, text: "Open ", boldText: "JazzCash app" },
    { id: 2, text: "Click on ", boldText: "More" },
    { id: 3, text: "Go to ", boldText: "Education tab" },
    { id: 4, text: "Click ", boldText: "Universities" },
    { id: 5, text: "Select ", boldText: "Saylani Education", extraText: " from the list" },
    { id: 6, text: "Paste your ", boldText: "Voucher ID" },
    { id: 7, text: "Pay your fee" },
  ];

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => console.log("Video play interrupted:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fee-payment-container ">
      <div className="fee-payment-card rounded-3 p-2 d-flex  " style={{backgroundColor:"#1E2A3A",alignItems:"center",justifyContent:"space-between"}}>
        
        {/* Left Section: Instructions List */}
        <div className="fee-payment-card__instructions">
          <h2 className="instructions-title text-white">To pay your fee via JazzCash:</h2>
          <ol className="instructions-list text-white">
            {steps.map((step) => (
              <li key={step.id} className="instructions-list__item">
                <span className="step-text">
                  {step.text}
                  {step.boldText && <strong>{step.boldText}</strong>}
                  {step.extraText && step.extraText}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Right Section: Mobile Frame Video Player */}
        <div className="fee-payment-card__video-wrapper">
          <div className="phone-frame">
            {/* Replace src with your actual video file path */}
            <video 
              ref={videoRef}
              className="phone-frame__video"
              src={video}
              style={{height:"300px"}}
              Play
              loop
              playsInline
              onClick={handlePlayPause}
            />

          
          </div>
        </div>

      </div>
    </div>
  );
};

export default Payment;