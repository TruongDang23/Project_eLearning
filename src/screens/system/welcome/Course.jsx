import React from "react";
import styled from "styled-components";

const CourseWrapper = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;

  img {
    width: 100%;
    border-radius: 5px;
  }

  h3 {
    font-size: 1.8rem;
    margin: 1rem 0;
  }

  p {
    font-size: 1.6rem;
    margin: 0.5rem 0;
  }

  p:first-child {
    font-weight: bold;
  }

  p:last-child {
    color: #555;
  }
`;

function Course({ course }) {
  return (
    <CourseWrapper className="course">
      <img src={course.imgSrc} alt={course.title} />
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <p>Price: ${course.price}</p>
      <p>
        Rating: {course.rating_star} ({course.rating_count})
      </p>
      <p>Creator: {course.creater}</p>
    </CourseWrapper>
  );
}

export default Course;
