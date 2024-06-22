import styled from "styled-components";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QuizIcon from "@mui/icons-material/Quiz";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
// const InforCourseData = {
//   instructor: "John Doe",
//   type_of_course: "Course",
//   title: "Introduction to Database",
//   method: "Self-directed study",
//   language: "English",
//   price: 0,
//   currency: "USD",
//   program: "Knowledge",
//   category: "Database",
//   course_for: "Beginner",
//   status: "published",
//   num_lecture: 10,
//   star: 4.5,
//   number_enrolled: 100,
//   duration: 10,
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
//       date: "2024-06-07 13:00:00",
//     },
//   ],
// };

function SideBar({ inforCourseData }) {
  return (
    <SideBarWrapper>
      {/* Video */}
      <div className="sidebar-video">
        <iframe
          title="Course Introduction"
          src={inforCourseData.video_introduce}
        ></iframe>
      </div>
      <div className="sidebar-detail">
        <ul>
          <li>
            <VideoLibraryIcon />
            <span>{inforCourseData.duration} hours on-demand video</span>
          </li>
          <li>
            <AssignmentIcon />
            <span>{inforCourseData.num_lecture} lectures</span>
          </li>
          <li>
            <QuizIcon />
            <span>Quizzes</span>
          </li>
          <li>
            <LocalAtmIcon />
            <span>
              {inforCourseData.price === 0
                ? "Free"
                : `$${inforCourseData.price}`}
            </span>
          </li>
        </ul>
      </div>
      <div className="sidebar-buttons">
        <button className="sidebar-button button-buy">Buy now</button>
        <button className="sidebar-button button-goto">Go to course</button>
      </div>
    </SideBarWrapper>
  );
}
const SideBarWrapper = styled.aside`
  padding: 20px;
  height: auto;

  .sidebar-video {
    iframe {
      width: 100%;
      height: 200px;
      transition: transform 0.3s ease-in-out;
      animation: fadeIn 1s ease-in-out;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .sidebar-detail {
    margin-top: 20px;
    padding: 10px 20px;
    ul {
      list-style: none;
      padding: 0;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 1.6rem;
        svg {
          margin-right: 10px;
          font-size: 2rem;
          color: #1971c2;
          transition: transform 0.3s ease, color 0.3s ease;
        }
        &:hover {
          svg {
            transform: scale(1.2);
            color: #0c47a1;
          }
        }
        animation: fadeInUp 0.7s ease-in-out;
      }
    }
  }

  .sidebar-buttons {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .sidebar-button {
      padding: 10px;
      border: none;
      border-radius: 5px;
      font-size: 1.6rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.3s ease;
      animation: fadeInUp 0.8s ease-in-out;

      &:hover {
        transform: translateY(-2px);
      }
    }

    .button-buy {
      background-color: #1971c2;
      color: white;
      &:hover {
        background-color: #155b96;
      }
    }

    .button-goto {
      background-color: #e59819;
      color: white;
      &:hover {
        background-color: #c87f0a;
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
`;
export default SideBar;
