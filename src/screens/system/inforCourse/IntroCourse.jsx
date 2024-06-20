import React from "react";
import styled from "styled-components";

// const InforCourseData = {
//   instructor: "John Doe",
//   type_of_course: "Course",
//   title: "Introduction to Database",
//   method: "Self-directed study",
//   language: "English",
//   price: 49.99,
//   currency: "USD",
//   program: "Knowledge",
//   category: "Database",
//   course_for: "Beginner",
//   status: "published",
//   num_lecture: 10,
//   star: 4.5,
//   image_introduce: imageIntro,
//   video_introduce: videoIntro,
//   keywords: ["Database", "SQL", "Beginner"],
//   targets: [
//     "Understand basic database concepts",
//     "Write simple SQL queries",
//     "Design a simple database",
//   ],
//   requirements: [
//     "Basic understanding of computer science",
//     "No prior knowledge of databases is required",
//   ],
//   chapters: [
//     {
//       chapter_name: "Introduction",
//       lectures: [
//         {
//           id: 1,
//           name: "What is a Database?",
//           description: "Overview of databases",
//           type: "video",
//           source: "https://example.com/lecture1.mp4",
//           QnA: [
//             {
//               questionerID: 1,
//               question:
//                 "What is the difference between a database and a spreadsheet?",
//               date: "2024-06-01 10:00:00",
//               responses: [
//                 {
//                   responseID: 2,
//                   response:
//                     "A database can handle more complex queries and is more scalable.",
//                   date: "2024-06-01 11:00:00",
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: 2,
//           name: "Database Management Systems",
//           description: "Introduction to DBMS",
//           type: "file",
//           source: "https://example.com/lecture2.pdf",
//           QnA: [],
//         },
//       ],
//     },
//     {
//       chapter_name: "SQL",
//       lectures: [
//         {
//           id: 3,
//           name: "Introduction to SQL",
//           description: "Overview of SQL",
//           type: "video",
//           source: "https://example.com/lecture3.mp4",
//           QnA: [],
//         },
//         {
//           id: 4,
//           name: "Basic SQL Queries",
//           description: "Introduction to SQL queries",
//           type: "file",
//           source: "https://example.com/lecture4.pdf",
//           QnA: [],
//         },
//       ],
//     },
//   ],
//   review: [
//     {
//       reviewerName: "Lê Thành Vinh",
//       message:
//         "Great course! The instructor explains concepts clearly and concisely.",
//       star: 4.5,
//       date: "2024-06-01 12:00:00",
//     },
//     {
//       reviewerName: "Đặng Quang Trường",
//       message: "I learned a lot from this course.",
//       star: 4.0,
//       date: "2024-06-01 13:00:00",
//     },
//   ],
// };

function IntroCourse({ inforCourseData }) {
  const { title, image_introduce, keywords } = inforCourseData;
  return (
    <IntroCourseWrapper>
      <div className="container intro-course">
        <div className="intro-course-detail">
          <h3>{title}</h3>
          <div className="intro-course-keyword">
            {keywords.map((keyword, index) => (
              <span key={index}>{keyword}</span>
            ))}
          </div>
        </div>
        <div className="intro-course-img">
          <img src={image_introduce} alt="Course Introduction" />
        </div>
      </div>
    </IntroCourseWrapper>
  );
}

const IntroCourseWrapper = styled.section`
  background-color: #2d2f31;
  color: #fff;
  .intro-course {
    display: grid;
    ${"" /* Phần đầu tiên chiếm 2 phần, phần còn lại là 1 phần */}
    grid-template-columns: 2fr 1fr;
    .intro-course-detail {
      padding: 20px;
      h3 {
        font-size: 2.8rem;
      }
      .intro-course-keyword {
        display: flex;
        gap: 10px;
        margin-top: 10px;
        span {
          background-color: #4a4a4a;
          padding: 5px 10px;
          border-radius: 5px;
        }
      }
    }
    .intro-course-img {
      padding: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

export default IntroCourse;
