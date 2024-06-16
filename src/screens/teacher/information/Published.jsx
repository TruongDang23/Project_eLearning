import styled from 'styled-components'
import { useState } from 'react';

function Published ({ profile, setProfile }) {

  return (
    <Wrapper>
      <div className="course">
        <div className="content-course">
          {profile.course_published.map((course, index) => (
            <div key={index} className="course-item">
              <p><strong>Course name:</strong> {course.title}</p>
              <p><strong>Published time:</strong> {course.time}</p>
              <p><strong>Method:</strong> {course.method}</p>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  .course{
    height:auto;
    max-height: 250px;
    width: 100%;
    max-width: 600px;
    border-radius: 5px;
    padding: 10px;
    font-size: 2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    .content-course{
      max-height: 200px;
      width: 100%;
      max-width: 600px;
      overflow-y: auto;
      margin-bottom: 10px;
    }
    .course-item {
      padding: 10px;
      margin: 10px 0;
      border-bottom: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
      max-width: 600px;
    }

    .course-item p {
      margin: 5px 0;
    }

    .course-item strong {
      color: #333;
    }
  }
`;

export default Published;