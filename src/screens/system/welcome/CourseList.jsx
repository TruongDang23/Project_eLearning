import React from "react";
import styled from "styled-components";
import Course from "./Course";
import course_images from "../assets/images";

const CourseData = [
  {
    course_id: "C001",
    type_of_course: "React",
    title: "React for Beginners",
    description: "Learn React from scratch with hands-on projects.",
    price: 49.99,
    rating_star: 4.5,
    rating_count: 100,
    imgSrc: course_images.img_course1,
    creater: "John Doe",
  },
  {
    course_id: "C002",
    type_of_course: "Node.js",
    title: "Node.js for Beginners",
    description: "Learn Node.js from scratch with hands-on projects.",
    price: 59.99,
    rating_star: 4.7,
    rating_count: 120,
    imgSrc: course_images.img_course2,
    creater: "Jonelle Doe",
  },
  {
    course_id: "C003",
    type_of_course: "MongoDB",
    title: "MongoDB for Beginners",
    description: "Learn MongoDB from scratch with hands-on projects.",
    price: 69.99,
    rating_star: 4.8,
    rating_count: 130,
    imgSrc: course_images.img_course3,
    creater: "Mary Doe",
  },
  {
    course_id: "C004",
    type_of_course: "Express.js",
    title: "SQL for Beginners: Learn SQL using MySQL and Database Design",
    description: "Learn Express.js from scratch with hands-on projects.",
    price: 79.99,
    rating_star: 4.9,
    rating_count: 140,
    imgSrc: course_images.img_course4,
    creater: "Micale Jackson",
  },
  {
    course_id: "C005",
    type_of_course: "MERN",
    title: "MERN Stack for Beginners",
    description: "Learn MERN Stack from scratch with hands-on projects.",
    price: 89.99,
    rating_star: 3.0,
    rating_count: 150,
    imgSrc: course_images.img_course5,
    creater: "Erling Haaland",
  },
  {
    course_id: "C006",
    type_of_course: "React Native",
    title: "Live Accounting App by C# .NET Core in Windows Forms and SQL",
    description: "Learn React Native from scratch with hands-on projects.",
    price: 99.99,
    rating_star: 5.0,
    rating_count: 160,
    imgSrc: course_images.img_course6,
    creater: "Goerge Best",
  },
];

const CourseListWrapper = styled.section`
  .courses {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 2.4rem;
  }
  h2 {
    font-size: 3.6rem;
    text-align: center;
    margin-bottom: 4rem;
    color: #1971c2;
  }
`;

function CourseList() {
  return (
    <CourseListWrapper className="container">
      <h2 className="heading-tertiary">Courses</h2>
      <div className="courses">
        {CourseData.map((course) => (
          <Course key={course.course_id} course={course} />
        ))}
      </div>
    </CourseListWrapper>
  );
}

export default CourseList;
