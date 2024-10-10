import React from "react";

const PopupModal = ({
  isPopupVisible,
  closePopup,
  videoRef,
  formatTime,
  seconds,
  handleRecordButtonClick,
  isRecording,
}) => {
  if (!isPopupVisible) return null;
  return (
    <div className="popup-container" style={{ display: "flex" }}>
      <div className="popup-content">
        <i className="bx bx-x" id="closePopupBtn" onClick={closePopup}></i>
        <div className="timer" id="timer">
          {formatTime(seconds)}
        </div>
        <video
          ref={videoRef}
          autoPlay
          style={{
            width: "100%",
            height: "auto",
            transform: "scale(-1, 1)",
          }}
        ></video>
        <div className="avatar">AVATAR</div>
        <div className="sample-question">
          Sample Question: What are your strengths?
        </div>
        <button
          className="record-btn"
          id="recordBtn"
          onClick={handleRecordButtonClick}
        >
          {isRecording ? (
            <>
              <i className="bx bx-stop"></i>
            </>
          ) : (
            <>
              <i className="bx bx-video"></i>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
