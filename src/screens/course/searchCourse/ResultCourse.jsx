import styled from "styled-components";
import CourseCard from "./CourseCard";


function ResultCourse({ searchCourseData }) {
  return (
    <ResultCourseWrapper>
      {searchCourseData.map((course) => (
        <CourseCard key={course.courseID} course={course} />
      ))}
    </ResultCourseWrapper>
  );
}

const ResultCourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default ResultCourse;
