import React, { useState } from "react";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import QuizIcon from "@mui/icons-material/Quiz";

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

function AccordionCourse({ inforCourseData }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <AccordionCourseWrapper>
      {inforCourseData.chapters.map((chapter, index) => (
        <Accordion
          key={index}
          expanded={expanded}
          onChange={handleExpansion}
          sx={{
            boxShadow: "none",
            borderBottom: "1px solid #e0e0e0",
            fontSize: "1rem !important",
            padding: "0px 20px",
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              padding: "10px 0",
              "& .MuiAccordionSummary-content": {
                margin: 0,
              },
            }}
          >
            <h3>
              Chapter {index + 1}: {chapter.chapter_name}
            </h3>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {chapter.lectures.map((lecture, index) => (
                <li key={index}>
                  <div>
                    <h4>
                      {index + 1}
                      {": "}
                      {lecture.name}
                    </h4>
                  </div>
                  <div>
                    {lecture.type === "video" ? (
                      <>
                        <OndemandVideoIcon />
                        <a
                          href={lecture.source}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {lecture.description}
                        </a>
                      </>
                    ) : lecture.type === "file" ? (
                      <>
                        <AttachFileIcon />
                        <a
                          href={lecture.source}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {lecture.description}
                        </a>
                      </>
                    ) : (
                      <>
                        <QuizIcon />
                        <a
                          href={lecture.source}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {lecture.description}
                        </a>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}
    </AccordionCourseWrapper>
  );
}

const AccordionCourseWrapper = styled.section`
  background-color: #f9f9f9;
  color: #555 !important;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      gap: 10px;
      padding: 10px 0;

      div {
        display: flex;
        align-items: center;

        h4 {
          margin: 0;
          font-size: 1.6rem !important;
          color: #333 !important;
        }

        a {
          margin-left: 1.6rem;
          text-decoration: none;
          color: #333;
          font-size: 1.6rem;
          transition: color 0.3s ease;
          &:hover {
            color: #1971c2;
          }
        }
      }
    }
  }
`;

export default AccordionCourse;
