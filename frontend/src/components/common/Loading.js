import React from "react";

const Loading = ({width, height}) => {
  return (
    <div className="bg-white rounded-full border-2 border-blue-600 border-l-transparent animate-spin mx-auto mt-[80px] mb-[80px]" style={{
      width: width,
      height: height
    }}></div>
  );
};

export default Loading;
