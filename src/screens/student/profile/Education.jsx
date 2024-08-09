import React from "react";
import styled from "styled-components";

function Education({ degrees }) {
  return (
    <EducationWrapper>
      <div className="education">
        <h2>Education</h2>
        <hr />
        <div className="education__content">
          {degrees.map((degree, index) => (
            <div key={index} className="education__content-item">
              <div className="education__content-item__title">
                <h3>{degree.falcuty}</h3>
                <p>{degree.school}</p>
                <p>
                  {degree.begin_time} to {degree.end_time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EducationWrapper>
  );
}

const EducationWrapper = styled.section`
  display: flex;
  margin: 0 auto;
  width: 90%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: #0000000f 0px 4px 20px 0px;

  .education {
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
    .education__content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .education__content-item {
        display: flex;
        gap: 10px;
        .education__content-item__title {
          h3 {
            font-size: 1.6rem;
            font-weight: 700;
            color: #2d2f31;
          }
          p {
            font-size: 1.4rem;
            color: #2d2f31;
          }
        }
      }
    }
  }
`;

export default Education;
