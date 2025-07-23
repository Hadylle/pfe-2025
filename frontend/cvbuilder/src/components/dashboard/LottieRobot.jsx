// src/components/dashboard/LottieRobot.jsx
import React from "react";
import Lottie from "lottie-react";
import robotAnimation from "../../assets/robot3.json"; // adjust path

const LottieRobot = ({ width = 300, height = 400 }) => {
  return (
    <div className=" p-6 flex items-center justify-center">
      <Lottie
        animationData={robotAnimation}
        loop
        style={{ width, height }}
      />
    </div>
  );
};

export default LottieRobot;
