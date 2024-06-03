import React from "react";
import "./HeroSection.css";
import heroImgPng from "../assets/test1.png";
function HeroSection() {
  return (
    <section className="section-hero">
      <div className="hero">
        <div className="hero-text-box">
          <h1 className="heading-primary">
            Learn essential skills for today and tomorrow
          </h1>
          <p className="hero-description">
            Skills for your present (and your future). Unlock your potential
            with our online courses. Gain skills that matter today and shape
            your future. Start learning with us now!
          </p>
          <a href="#Learning" className="hero-btn-primary">
            Start learning &rarr;
          </a>
          <a href="#learnmore" className="hero-btn-outline">
            Learn more &darr;
          </a>
        </div>
        <div className="hero-img-box">
          <picture>
            {/* <source srcSet={heroImgWebp} type="image/webp" /> */}
            <source srcSet={heroImgPng} type="image/png" />
            <img
              src={heroImgPng}
              className="hero-img"
              alt="Hero Section Image"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
