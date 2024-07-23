import styled from "styled-components";
import CourseCard from "./CourseCard";

function ResultCourse() {
  return (
    <ResultCourseWrapper>
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
    </ResultCourseWrapper>
  );
}

const ResultCourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default ResultCourse;
