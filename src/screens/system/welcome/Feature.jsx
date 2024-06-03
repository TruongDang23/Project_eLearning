import React from "react";
import styles from "./Feature.module.css";
import featureCer from "../assets/Certifications.png";
import featureFlex from "../assets/Flexible.png";
import featureCourse from "../assets/Courses.png";
import featureInstructor from "../assets/Instructors.png";
import featurePrice from "../assets/Prices.png";
import featureSupport from "../assets/Support.png";

function Feature() {
  const features = [
    {
      imgSrc: featureCourse,
      title: "High Quality Courses",
      description: "Learn from industry experts with high-quality courses.",
    },
    {
      imgSrc: featureFlex,
      title: "Flexible Learning",
      description: "Learn at your own pace, anytime and anywhere.",
    },
    {
      imgSrc: featureCer,
      title: "Certifications",
      description:
        "Earn certificates to showcase your skills and achievements.",
    },
    {
      imgSrc: featureInstructor,
      title: "Expert Instructors",
      description: "Get taught by the best instructors in the industry.",
    },
    {
      imgSrc: featurePrice,
      title: "Affordable Prices",
      description: "Access courses at prices that fit your budget.",
    },
    {
      imgSrc: featureSupport,
      title: "Community Support",
      description: "Join a community of learners and get support.",
    },
  ];
  return (
    <section className={styles.featureSection}>
      <h2 className="heading-tertiary">Why Choose Us?</h2>
      <div className={styles.features}>
        {features.map((feature, index) => (
          <div className={styles.feature} key={index}>
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
