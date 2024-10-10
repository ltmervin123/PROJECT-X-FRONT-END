import React, { useState, useRef } from "react";
import "../style/Sidebar_Home.css";
import axios from "axios"; // Make sure axios is installed and imported
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const fileInputRef = useRef(null); // Add a ref for the file input

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

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

  // Handle file upload functionality
  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const handleFileSelection = async (event) => {
    const file = event.target.files[0];
    try {
      if (!file) throw new Error("No file selected.");

      if (validateFile(file)) {
        await uploadFileToBackend(file);
        alert("File uploaded successfully!"); // Success message
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      alert(error.message); // Show error message in an alert
    }
  };

  // Validate file type and size
  const validateFile = (file) => {
    const allowedExtensions = /(\.doc|\.docx|\.pdf)$/i;
    const maxSize = 10 * 1024 * 1024; // 10MB limit

    if (!allowedExtensions.test(file.name)) {
      throw new Error(
        "Invalid file type. Please select a .doc, .docx, or .pdf file."
      );
    }

    if (file.size > maxSize) {
      throw new Error("File size exceeds 10MB. Please choose a smaller file.");
    }

    console.log("File validation passed:", file.name);
    return true;
  };

  // Upload file to the backend
  const uploadFileToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Uploading file to the backend...");

      const response = await axios.post(
        "http://localhost:5000/api/uploadResume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      throw new Error("Error occurred while uploading file: " + error);
    }
  };

  return (
    <div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="logo-details">
          <div className="avatar">AVATAR</div>
          <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
        </div>
        <ul className="nav-list">
          <li className="active">
            <a href="/home" id="mockInterviewBtn">
              <i className="bx bx-home"></i>
              <span className="links_name">Mock Interview</span>
            </a>
            <span className="tooltip">Mock Interview</span>
          </li>
          <li>
            <a href="#!" id="uploadResume" onClick={handleUploadClick}>
              <i className="bx bx-upload"></i>
              <span className="links_name">Upload Resume</span>
            </a>
            <span className="tooltip">Upload Resume</span>
          </li>
          <li>
            <a href="/home">
              <i className="bx bx-clipboard"></i>
              <span className="links_name">Result</span>
            </a>
            <span className="tooltip">Result</span>
          </li>
          <li className="profile">
            <div
              className="Logout"
              onClick={() => alert("Logout functionality not implemented yet.")}
            >
              LOGOUT
            </div>
            <i className="bx bx-log-out" id="log_out"></i>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <div className="header-home">
          <div className="text">DASHBØARD</div>
          <div
            className="user-info"
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <span
              className="user-name"
              onClick={() => setDropdownVisible((prev) => !prev)}
            >
              User Name
            </span>
            {isDropdownVisible && (
              <div className="dropdown-menu">
                <div
                  className="dropdown-item"
                  onClick={() =>
                    alert("Settings functionality not implemented yet.")
                  }
                >
                  <i className="bx bx-cog"></i>Settings
                </div>
                <div
                  className="dropdown-item"
                  onClick={() =>
                    alert("Logout functionality not implemented yet.")
                  }
                >
                  <i className="bx bx-log-out"></i> Logout
                </div>
              </div>
            )}
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="card" id="mockInterviewOptions">
          <h2>Please Choose Interview Option</h2>
          <div className="option-container">
            <div className="option-card">
              <img src={img1} alt="Upload Resume" className="option-image" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae, laudantium cumque nulla
              </p>
              <button id="uploadResume" onClick={handleUploadClick}>
                Upload Resume
              </button>
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".doc,.docx,.pdf"
                onChange={handleFileSelection}
              />
            </div>
            <div className="option-card">
              <img
                src={img2}
                alt="Start Mock Interview"
                className="option-image"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae, laudantium cumque nulla
              </p>
              <button onClick={startMockInterview}>Start Mock Interview</button>
            </div>
          </div>
        </div>

        {isPopupVisible && (
          <div className="popup-container" style={{ display: "flex" }}>
            <div className="popup-content">
              <i
                className="bx bx-x"
                id="closePopupBtn"
                onClick={closePopup}
              ></i>
              <div className="timer" id="timer">
                {formatTime(seconds)}
              </div>
              <video
                ref={videoRef}
                autoPlay
                style={{ width: "100%", height: "auto", transform: 'scale(-1, 1)'}}
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
        )}
      </section>
    </div>
  );
};

export default Home;
