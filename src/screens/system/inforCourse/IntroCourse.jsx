import React from "react";
import styled from "styled-components";
import StarRating from "~/components/general/Other/StarRating";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Person4Icon from "@mui/icons-material/Person4";

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
          <div className="intro-course-infor">
            <ul>
              <li>
                <VideoCameraFrontIcon />
                Supervised by AI camera
              </li>
              <li>
                <WorkspacePremiumIcon />
                Certificate
              </li>
            </ul>
            <div className="intro-course-infor-instructor">
              <Person4Icon />
              <span>John Doe</span>
            </div>
            <div className="intro-course-infor-star">
              <StarRating rating_star={inforCourseData.star} />
              {inforCourseData.star} ({inforCourseData.review.length} reviews){" "}
              {inforCourseData.number_enrolled} students enrolled
            </div>
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
  min-height: 200px;
  .intro-course {
    display: grid;
    /* Phần đầu tiên chiếm 2 phần, phần còn lại là 1 phần */
    grid-template-columns: 2fr 1fr;
    .intro-course-detail {
      padding: 20px;
      h3 {
        font-size: 2.8rem;
        animation: fadeIn 1s ease-in-out;
      }
      .intro-course-keyword {
        display: flex;
        gap: 10px;
        margin-top: 10px;
        font-size: 1.6rem;
        span {
          background-color: #4a4a4a;
          padding: 5px 10px;
          border-radius: 5px;
          animation: fadeInUp 0.5s ease-in-out;
        }
      }
      .intro-course-infor {
        margin-top: 20px;
        ul {
          padding: 0;
          list-style: none;
          li {
            display: flex;
            align-items: center;
            font-size: 1.6rem;
            gap: 10px;
            margin-bottom: 10px;
            svg {
              font-size: 2rem;
              color: #1971c2;
              transition: transform 0.3s ease;
            }
            &:hover {
              svg {
                transform: scale(1.2);
              }
            }
            animation: fadeInUp 0.7s ease-in-out;
          }
        }
        .intro-course-infor-instructor,
        .intro-course-infor-star {
          display: flex;
          align-items: center;
          font-size: 1.6rem;
          gap: 10px;
          margin-bottom: 10px;
          svg {
            font-size: 2rem;
          }
          animation: fadeInUp 0.7s ease-in-out;
        }
        .intro-course-infor-instructor svg {
          color: #1971c2;
        }
        .intro-course-infor-star svg {
          color: #e59819;
        }
      }
    }
    .intro-course-img {
      padding: 20px;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        animation: fadeIn 1s ease-in-out;
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (max-width: 1400px) {
    .intro-course {
      grid-template-columns: 1fr;
      .intro-course-img {
        img {
          height: auto;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .intro-course-detail h3 {
      font-size: 2.4rem;
    }
    .intro-course-keyword span {
      font-size: 1.4rem;
    }
    .intro-course-infor li {
      font-size: 1.4rem;
    }
    .intro-course-infor-instructor,
    .intro-course-infor-star {
      font-size: 1.4rem;
    }
    .intro-course-infor-star {
      flex-direction: column;
      align-items: flex-start !important;
    }
  }

  @media (max-width: 480px) {
    .intro-course-detail h3 {
      font-size: 2rem;
    }
    .intro-course-keyword span {
      font-size: 1.2rem;
    }
    .intro-course-infor li {
      font-size: 1.2rem;
    }
    .intro-course-infor-instructor,
    .intro-course-infor-star {
      font-size: 1.2rem;
    }
    .intro-course-infor-star {
      flex-direction: column;
      align-items: flex-start !important;
    }
  }
`;

export default IntroCourse;
