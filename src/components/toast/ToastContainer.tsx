"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerClient = () => {
  return (
    <ToastContainer
      className="global-toast z-[10001]"
      limit={1}
      position="top-right"
      hideProgressBar
      newestOnTop
      pauseOnHover
      autoClose={false}
      closeOnClick={false}
    />
  );
};

export default ToastContainerClient;
