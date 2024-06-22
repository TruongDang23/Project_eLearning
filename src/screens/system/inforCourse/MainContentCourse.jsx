import styled from "styled-components";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import StarRating from "~/components/general/Other/StarRating";
import Avatar from "@mui/material/Avatar";
import { formatDistanceToNow } from "date-fns";

// const inforCourseData = {
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

function MainContentCourse({ inforCourseData }) {
  return (
    <MainContentCourseWrapper>
      <div className="what-will-you-learn">
        <h3>What you will learn in this course?</h3>
        <ul>
          {inforCourseData.targets.map((target, index) => (
            <li key={index}>
              <DoneRoundedIcon />
              {target}
            </li>
          ))}
        </ul>
      </div>
      <div className="course-requirment">
        <h3>Course Requirements</h3>
        <ul>
          {inforCourseData.requirements.map((requirement, index) => (
            <li key={index}>
              <DoneRoundedIcon />
              {requirement}
            </li>
          ))}
        </ul>
      </div>
      <div className="course-content">
        <h3>Course Content</h3>
        {inforCourseData.chapters.map((chapter, index) => (
          <div key={index}>
            <h4>{chapter.chapter_name}</h4>
            <ul>
              {chapter.lectures.map((lecture, index) => (
                <li key={index}>
                  <a href={lecture.source}>{lecture.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="course-review">
        <div className="course-rating">
          <h3>Course Review</h3>
          <h4>
            <span>Rating: {inforCourseData.star}</span>
            <StarRating rating_star={inforCourseData.star} />
          </h4>
        </div>
        <div className="course-list-review"></div>
        {inforCourseData.review.map((review, index) => (
          <div key={index} className="course-personal-review">
            <div className="course-personal-review-info">
              <Avatar />
              <h4>{review.reviewerName}</h4>
              <span>
                {formatDistanceToNow(new Date(review.date), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <div className="course-personal-review-content">
              <div className="course-personal-review-content-star">
                <StarRating rating_star={review.star} />{" "}
                <span>{review.star}</span>
              </div>
              <p>{review.message}</p>
            </div>
          </div>
        ))}
      </div>
    </MainContentCourseWrapper>
  );
}

const MainContentCourseWrapper = styled.section`
  padding: 20px;
  .what-will-you-learn {
    border: 1px solid #ccc;
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    h3 {
      font-size: 2.4rem;
      margin-bottom: 20px;
      animation: fadeIn 1s ease-in-out;
    }
    ul {
      list-style-type: none;
      animation: fadeInUp 0.5s ease-in-out;
      li {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
        font-size: 1.8rem;
        svg {
          color: #1971c2;
          font-size: 2.4rem;
          transition: transform 0.3s ease;
        }
        &:hover {
          svg {
            transform: scale(1.2);
          }
        }
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

  .course-requirment {
    border: 1px solid #ccc;
    padding: 20px;
    margin-top: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    h3 {
      font-size: 2.4rem;
      margin-bottom: 20px;
      animation: fadeIn 1s ease-in-out;
    }
    ul {
      list-style-type: none;
      animation: fadeInUp 0.5s ease-in-out;
      li {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
        font-size: 1.8rem;
        svg {
          color: #007bff;
          font-size: 2.4rem;
          transition: transform 0.3s ease;
        }
        &:hover {
          svg {
            transform: scale(1.2);
          }
        }
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

  .course-content {
    border: 1px solid #ccc;
    padding: 20px;
    margin-top: 20px;
    h3 {
      font-size: 2.4rem;
      margin-bottom: 20px;
    }
    h4 {
      font-size: 2rem;
      margin-bottom: 10px;
    }
    ul {
      list-style-type: none;
      li {
        font-size: 1.8rem;
        a {
          color: #007bff;
        }
      }
    }
  }
  .course-review {
    border: 1px solid #ccc;
    padding: 20px;
    margin-top: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    h4 {
      display: flex;
      justify-content: space-between;
      font-size: 1.8rem;
      gap: 10px;
      animation: slideIn 0.5s ease-in-out;
    }
    .course-rating {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      h4 {
        display: block;
      }
      h3 {
        align-items: center;
        font-size: 2.4rem;
        margin-bottom: 20px;
        animation: fadeIn 1s ease-in-out;
      }
    }
    .course-list-review {
      margin-top: 20px;
    }
    .course-personal-review {
      padding: 20px;
      margin-top: 20px;
      border-top: 0.5px solid #ccc;
      display: flex;
      flex-direction: column;
      gap: 10px;
      animation: fadeInUp 0.5s ease-in-out;
      .course-personal-review-info {
        display: flex;
        gap: 10px;
        align-items: center;
        h4 {
          font-size: 1.8rem;
        }
        span {
          font-size: 1.6rem;
        }
      }
      .course-personal-review-info > span:last-child {
        margin-left: auto;
      }
      .course-personal-review-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .course-personal-review-content-star {
          display: flex;
          align-items: center;
          gap: 10px;
          span {
            font-size: 1.8rem;
          }
        }
        p {
          font-size: 1.6rem;
        }
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

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
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
`;

export default MainContentCourse;
