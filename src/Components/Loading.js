import React from "react";
import Lottie from "react-lottie";
import * as loading from "../assets/json/loading.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const Loading = () => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ marginTop: 70 }}
  >
    <Lottie options={defaultOptions} height={300} width={300} />
  </div>
);

export default Loading;
