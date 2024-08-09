import React from "react";
import styled from "styled-components";

import Link from "@mui/material/Link";

function PersonalProject({ projects }) {
  return (
    <PersonalProjectWrapper>
      <div className="personal-project">
        <h2>Personal projects</h2>
        <hr />
        <div className="personal-project__content">
          {projects.map((project, index) => {
            // Kiểm tra và thêm giao thức nếu cần
            const url =
              project.link.startsWith("http://") ||
              project.link.startsWith("https://")
                ? project.link
                : `http://${project.link}`;

            return (
              <div key={index} className="personal-project__content-item">
                <div className="personal-project__content-detail">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="personal-project__content-view">
                  <Link href={url} target="_blank">
                    View project
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PersonalProjectWrapper>
  );
}

const PersonalProjectWrapper = styled.section`
  display: flex;
  margin: 0 auto;
  width: 90%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: #0000000f 0px 4px 20px 0px;

  .personal-project {
    width: 100%;
    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1971c2;
      margin-bottom: 10px;
    }
    hr {
      margin-bottom: 10px;
      border: none;
      height: 2px;
      background-color: #1971c2;
    }
    .personal-project__content {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      .personal-project__content-item {
        display: flex;
        justify-content: space-between; /* Căn chỉnh các phần tử trong container */
        align-items: center; /* Căn chỉnh các phần tử trong container */
        width: 100%;
        .personal-project__content-detail {
          h3 {
            font-size: 1.6rem;
            font-weight: 700;
            color: #2d2f31;
          }
          p {
            font-size: 1.4rem;
            line-height: 1.6;
            color: #2d2f31;
          }
        }
        .personal-project__content-view {
          margin-left: auto;
          a {
            color: #1971c2;
            font-size: 1.6rem;
            font-weight: 700;
            text-decoration: none;
            border: 2px solid #1971c2;
            padding: 5px 10px;
            display: inline-block;
            margin-top: 10px;
            &:hover {
              background-color: #1971c2;
              color: #fff;
            }
          }
        }
      }
    }
  }
`;

export default PersonalProject;
