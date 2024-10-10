import { React, useState, useRef } from "react";
import MockInterview from "./MockInterviewChild";
import PopupModal from "./MockInterviewPopupModelChild";
import UploadResume from "./UploadResume";

const MockInterviewParent = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);

  const startMockInterview = () => {
    setPopupVisible(true);
    startCamera();
  };

  const closePopup = () => {
    setPopupVisible(false);
    stopCamera();
    resetTimer();
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.onstop = handleStop;

      return () => {
        stream.getTracks().forEach((track) => track.stop());
      };
    } catch (error) {
      console.error("Error accessing camera: ", error);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      recordedChunksRef.current.push(event.data);
    }
  };

  const handleStop = () => {
    const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
    recordedChunksRef.current = [];
    if (window.confirm("Do you want to save the recording?")) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recording.webm";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleRecordButtonClick = () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      stopTimer();
    } else {
      mediaRecorderRef.current.start();
      startTimer();
    }
    setIsRecording((prev) => !prev);
  };

  const startTimer = () => {
    setSeconds(0);
    timerIntervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerIntervalRef.current);
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const sec = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${sec}`;
  };
  return (
    <div className="option-container">
      <UploadResume />
      <MockInterview startMockInterview={startMockInterview} />
      <PopupModal
        isPopupVisible={isPopupVisible}
        closePopup={closePopup}
        videoRef={videoRef}
        formatTime={formatTime}
        seconds={seconds}
        handleRecordButtonClick={handleRecordButtonClick}
        isRecording={isRecording}
      />
    </div>
  );
};
export default MockInterviewParent;
