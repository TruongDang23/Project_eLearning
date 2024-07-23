import styled from "styled-components";

function CourseCard() {
  return (
    <CourseCardWrapper>
      <div className="course-card">
        <div className="course-card__img">
          <img src="https://via.placeholder.com/250" alt="course" />
        </div>
        <div className="course-card__content">
          <h3>Course Title</h3>
          <p>Course Description</p>
        </div>
      </div>
    </CourseCardWrapper>
  );
}

const CourseCardWrapper = styled.div`
  .course-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    .course-card__img {
      img {
        width: 100%;
        height: 150px;
        object-fit: cover;
      }
    }
    .course-card__content {
      padding: 1rem;
      h3 {
        margin: 0;
        font-size: 1.5rem;
      }
      p {
        margin: 0;
        font-size: 1rem;
      }
    }
  }
`;

export default CourseCard;
