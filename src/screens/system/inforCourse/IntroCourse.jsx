import React from "react";
import styled from "styled-components";

function IntroCourse({ InforCourseData }) {
 

  return (
    <IntroCourseWrapper>
      <h1>Course Introduction</h1>
    </IntroCourseWrapper>
  );
}

const IntroCourseWrapper = styled.section`
  background-color: black;
`;

export default IntroCourse;
