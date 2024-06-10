import styled from "styled-components";
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
    creater: "Jane Doe",
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
    creater: "John Doe",
  },
  {
    course_id: "C004",
    type_of_course: "Express.js",
    title: "Express.js for Beginners",
    description: "Learn Express.js from scratch with hands-on projects.",
    price: 79.99,
    rating_star: 4.9,
    rating_count: 140,
    imgSrc: course_images.img_course1,
    creater: "Jane Doe",
  },
  {
    course_id: "C005",
    type_of_course: "MERN",
    title: "MERN Stack for Beginners",
    description: "Learn MERN Stack from scratch with hands-on projects.",
    price: 89.99,
    rating_star: 5.0,
    rating_count: 150,
    imgSrc: course_images.img_course2,
    creater: "John Doe",
  },
  {
    course_id: "C006",
    type_of_course: "React Native",
    title: "React Native for Beginners",
    description: "Learn React Native from scratch with hands-on projects.",
    price: 99.99,
    rating_star: 5.0,
    rating_count: 160,
    imgSrc: course_images.img_course3,
    creater: "Jane Doe",
  },
];

const CourseListWrapper = styled.section`
  .courses {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
  }

  .course {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: center;
  }

  .course img {
    width: 100%;
    border-radius: 5px;
  }

  .course h3 {
    font-size: 1.8rem;
    margin: 1rem 0;
  }

  .course p {
    font-size: 1.6rem;
    margin: 0.5rem 0;
  }

  .course p:first-child {
    font-weight: bold;
  }

  .course p:last-child {
    color: #555;
  }
`;

function CourseList() {
  return (
    <CourseListWrapper className="container">
      <h2 className="heading-tertiary">Courses</h2>
      <div className="courses">
        {CourseData.map((course, index) => (
          <div className="course" key={index}>
            <img src={course.imgSrc} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Price: ${course.price}</p>
            <p>
              Rating: {course.rating_star} ({course.rating_count})
            </p>
            <p>Creater: {course.creater}</p>
          </div>
        ))}
      </div>
    </CourseListWrapper>
  );
}

export default CourseList;
