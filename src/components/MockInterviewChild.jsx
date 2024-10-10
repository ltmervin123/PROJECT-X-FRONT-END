import { React } from "react";
import img2 from "../assets/2.png";


const MockInterview = ({startMockInterview}) => {
  return (
    <div className="option-card">
      <img src={img2} alt="Start Mock Interview" className="option-image" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
        laudantium cumque nulla
      </p>
      <button onClick={startMockInterview}>Start Mock Interview</button>
    </div>
  );
};

export default MockInterview;
