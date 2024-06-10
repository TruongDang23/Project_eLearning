import React from "react";
import styled from "styled-components";
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
    <FeatureSection>
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
    </FeatureSection>
  );
}

const FeatureSection = styled.section`
  padding: 40px 20px;
  background-color: #f9f9f9;
  align-items: center;

  h2 {
    font-size: 3.6rem;
    text-align: center;
    margin-bottom: 4rem;
    color: #1971c2;
  }

  .features {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 30px;
    max-width: 120rem;
    margin: 0 auto;
  }

  .feature {
    background-color: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex: 1 1 calc(33.333% - 20px);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    img {
      width: 80px;
      height: 80px;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 2.4rem;
      margin-bottom: 3rem;
      color: #333;
    }

    p {
      font-size: 1.8rem;
      color: #555;
      line-height: 1.6;
    }
  }

  @media (max-width: 768px) {
    .features {
      flex-direction: column;
      gap: 20px;
    }

    .feature {
      flex: 1 1 100%;
    }
  }
`;

export default Feature;
