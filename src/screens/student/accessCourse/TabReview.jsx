import React from "react";
import styled from "styled-components";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import StarRating from "~/components/general/Other/StarRating";
import StarIcon from "@mui/icons-material/Star";
import Avatar from "@mui/material/Avatar";
import StarDynamic from "~/components/general/Other/StarDynamic";
import { formatDistanceToNow } from "date-fns";

// const AccessCourseData = {
//   instructor: "John Doe",
//   type_of_course: "Course",
//   title: "Introduction to Database",
//   status: "published",
//   program: "Knowledge",
//   category: "Database",
//   course_for: "Beginner",
//   progress: 30,
//   star: 4.5,
//   number_star: 2,
//   keywords: ["Database", "SQL", "Beginner"],
//   number_enrolled: 100,
//   duration: 10,
//   image_introduce:
//     "https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0",
//   video_introduce:
//     "https://storage.googleapis.com/e-learning-bucket/C000/CT01/video1.mp4",
//   chapters: [
//     {
//       chapter_name: "Introduction",
//       lectures: [
//         {
//           id: 1,
//           name: "What is a Database?",
//           description: "Overview of databases",
//           type: "video",
//           source:
//             "https://storage.googleapis.com/e-learning-bucket/C000/CT01/video1.mp4",
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
//           source:
//             "https://storage.googleapis.com/e-learning-bucket/C000/CT01/01-intro.pdf",
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
//           source:
//             "https://storage.googleapis.com/e-learning-bucket/C000/CT02/video2.mp4",
//           QnA: [],
//         },
//         {
//           id: 4,
//           name: "Basic SQL Queries",
//           description: "Introduction to SQL queries",
//           type: "file",
//           source:
//             "https://storage.googleapis.com/e-learning-bucket/C000/CT02/02-database.pdf",
//           QnA: [],
//         },
//       ],
//     },
//     {
//       chapter_name: "Database Design",
//       lectures: [
//         {
//           id: 5,
//           name: "Database Normalization",
//           description: "Introduction to database normalization",
//           type: "video",
//           source:
//             "https://storage.googleapis.com/e-learning-bucket/C000/CT03/video3.mp4",
//           QnA: [],
//         },
//         {
//           id: 6,
//           name: "Entity-Relationship Diagrams",
//           description: "Introduction to ER diagrams",
//           type: "file",
//           source:
//             "https://storage.googleapis.com/e-learning-bucket/C000/CT03/03-dbms.pdf",
//           QnA: [],
//         },
//         {
//           id: 7,
//           name: "Database Design Project",
//           description: "Design a simple database",
//           type: "assignment",
//           source:
//             "https://storage.googleapis.com/e-learning-bucket/C000/CT04/04-model.pdf",
//           QnA: [],
//         },
//       ],
//     },
//   ],
//   userProgress: {
//     userID: 1,
//     progress: [
//       {
//         lectureID: 1,
//         time: "2024-06-01 10:30:00",
//         percent: 50.0,
//       },
//       {
//         lectureID: 2,
//         time: "2024-06-01 11:30:00",
//         percent: 100.0,
//       },
//       {
//         lectureID: 3,
//         time: "2024-06-01 12:30:00",
//         percent: 0.0,
//       },
//       {
//         lectureID: 4,
//         time: "2024-06-01 13:30:00",
//         percent: 0.0,
//       },
//       {
//         lectureID: 5,
//         time: "2024-06-01 14:30:00",
//         percent: 0.0,
//       },
//       {
//         lectureID: 6,
//         time: "2024-06-01 15:30:00",
//         percent: 0.0,
//       },
//       {
//         lectureID: 7,
//         time: "2024-06-01 16:30:00",
//         percent: 0.0,
//       },
//     ],
//   },
//   review: [
//     {
//       reviewerName: "Le Thanh Vinh",
//       message:
//         "Great course! The instructor explains concepts clearly and concisely.",
//       star: 4.5,
//       date: "2024-06-01 12:00:00",
//     },
//     {
//       reviewerName: "Dang Quang Truong",
//       message: "I learned a lot from this course.",
//       star: 4.0,
//       date: "2024-06-07 13:00:00",
//     },
//   ],
// };

function TabReview({ accessCourseData }) {
  return (
    <TabRatingWrapper>
      <div className="review">
        <div className="review-title">
          <div className="title">
            <h2>Rating:</h2>
          </div>
          <div className="review-star">
            <span>{accessCourseData.star}</span>
            <StarIcon />
            <span>({accessCourseData.review.length} ratings)</span>
          </div>
        </div>

        <div className="review-content">
          <div className="review-list-review">
            {accessCourseData.review.map((review, index) => (
              <div key={index} className="personal-review">
                <div className="personal-review-info">
                  <Avatar />
                  <h4>{review.reviewerName}</h4>
                  <span>
                    {formatDistanceToNow(new Date(review.date), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <div className="personal-review-content">
                  <div className="personal-review-content-star">
                    <StarRating rating_star={review.star} />{" "}
                    <span>({review.star})</span>
                  </div>
                  <p>{review.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="review-yours">
          <h2>Your Review</h2>
          <div className="review-yours-star">
            <StarDynamic size="18" />
          </div>
          <div className="review-yours-content">
            <textarea placeholder="Write your review here..." />
          </div>
          <button>Submit</button>
        </div>
      </div>
    </TabRatingWrapper>
  );
}

const TabRatingWrapper = styled.div`
  .review {
    .review-title {
      display: flex;
      align-items: center;
      gap: 20px;
      .title {
        h2 {
          font-size: 2.4rem;
        }
      }
      .review-star {
        display: flex;
        align-items: center;
        gap: 5px;
        span {
          font-size: 1.6rem;
        }
        p {
          font-size: 1.6rem;
          display: ;
        }
        svg {
          color: #e59819;
        }
      }
    }
    .review-content {
      .review-list-review {
        .personal-review {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 20px 0;
          border-bottom: 1px solid #e0e0e0;
          .personal-review-info {
            display: flex;
            gap: 10px;
            align-items: center;
            h4 {
              margin: 0;
              font-size: 1.6rem;
            }
          }
          .personal-review-content {
            padding-left: 50px;
            .personal-review-content-star {
              display: flex;
              gap: 10px;
              align-items: center;
              padding-bottom: 10px;
              span {
                font-size: 1.6rem;
              }
            }
            p {
              font-size: 1.6rem;
            }
          }
        }
      }
    }

    .review-yours {
      margin-top: 20px;
      h2 {
        font-size: 2.4rem;
      }
      .review-yours-star {
        margin-top: 10px;
        display: flex;
        gap: 10px;
      }
      .review-yours-content {
        margin-top: 10px;
        textarea {
          width: 100%;
          height: 100px;
          padding: 10px;
          font-size: 1.6rem;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          resize: none;
        }
      }
      button {
        margin-top: 10px;
        padding: 10px 20px;
        font-size: 1.6rem;
        background-color: #e59819;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
`;

export default TabReview;
