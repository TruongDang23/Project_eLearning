import React from "react";
import styled from "styled-components";

function AboutMe({ self_introduce }) {
  return (
    <AboutMeWrapper>
      <div className="about-me">
        <h2>About me</h2>
        <hr />
        <p>{self_introduce}</p>
      </div>
    </AboutMeWrapper>
  );
}

const AboutMeWrapper = styled.section`
  display: flex;
  margin: 0 auto;
  width: 90%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: #0000000f 0px 4px 20px 0px;

  .about-me {
    width: 100%;
    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1971c2;
      margin-bottom: 10px;
    }
    hr {
      margin-bottom: 10px;
      border: none;
      height: 2px;
      background-color: #1971c2;
    }
    p {
      color: #2d2f31;
      font-size: 1.4rem;
      line-height: 1.6;
    }
  }

  @media (max-width: 768px) {
    .about-me {
      p {
        font-size: 1.6rem;
      }
    }
  }

  @media (max-width: 576px) {
    .about-me {
      h2 {
        font-size: 1.6rem;
      }
      p {
        font-size: 1.4rem;
      }
    }
  }

  @media (max-width: 420px) {
    .about-me {
      p {
        font-size: 1.2rem;
      }
    }
  }
`;

export default AboutMe;
