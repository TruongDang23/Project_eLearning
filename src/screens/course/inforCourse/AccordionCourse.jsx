import { useState } from "react";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import QuizIcon from "@mui/icons-material/Quiz";

function AccordionCourse({ inforCourseData }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: isExpanded
    }));
  };

  return (
    <AccordionCourseWrapper>
      {inforCourseData.chapters.map((chapter, index) => (
        <Accordion
          key={index}
          expanded={!!expanded[index]}
          onChange={handleExpansion(index)}
          sx={{
            boxShadow: "none",
            borderBottom: "1px solid #e0e0e0",
            fontSize: "1rem !important",
            padding: "0px 20px",
            "&:before": {
              display: "none"
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              padding: "10px 0",
              "& .MuiAccordionSummary-content": {
                margin: 0
              }
            }}
          >
            <h3>
              {/* Chapter {index + 1}: {chapter.chapter_name} */}
              Chapter {chapter.chapter_name}
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
