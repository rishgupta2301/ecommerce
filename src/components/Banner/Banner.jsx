// package import
import React from "react";
import "./Banner.css";
import SimpleImageSlider from "react-simple-image-slider";

const Banner = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=40",
    },
    {
      url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=40",
    },
    {
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=40",
    },
  ];
  // state

  // function
  return (
    <div className="banner">
      <SimpleImageSlider height={"100%"} width={"100%"} showBullets showNavs images={images} autoPlay />
    </div>
  );
};

export default Banner;
