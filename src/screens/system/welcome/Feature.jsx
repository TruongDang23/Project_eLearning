import React from "react";
import "./Feature.css";
import heroImgPng from "../assets/test2.png";
function Feature() {
  const features = [
    {
      imgSrc: heroImgPng,
      title: "High Quality Courses",
      description: "Learn from industry experts with high-quality courses.",
    },
    {
      imgSrc: "https://cdn-icons-png.flaticon.com/512/3199/3199927.png",
      title: "Flexible Learning",
      description: "Learn at your own pace, anytime and anywhere.",
    },
    {
      imgSrc: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png",
      title: "Certifications",
      description:
        "Earn certificates to showcase your skills and achievements.",
    },
    {
      imgSrc: "https://cdn-icons-png.flaticon.com/512/2919/2919600.png",
      title: "Expert Instructors",
      description: "Get taught by the best instructors in the industry.",
    },
    {
      imgSrc: "https://cdn-icons-png.flaticon.com/512/3081/3081917.png",
      title: "Affordable Prices",
      description: "Access courses at prices that fit your budget.",
    },
    {
      imgSrc: "https://cdn-icons-png.flaticon.com/512/2904/2904587.png",
      title: "Community Support",
      description: "Join a community of learners and get support.",
    },
  ];
  return (
    <section className="feature-section">
      <h2 className="heading-tertiary">Why Choose Us?</h2>
      <div className="features">
        {features.map((feature, index) => (
          <div className="feature" key={index}>
            <img src={feature.imgSrc} alt={feature.title} />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Feature;
