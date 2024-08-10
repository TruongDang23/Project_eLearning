import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import { GeneralHeader } from "~/components/general";
import { GeneralFooter } from "~/components/general";

import ContactInfo from "./ContactInfo";
import AboutMe from "./AboutMe";
import Education from "./Education";
import WorkExperience from "./WorkExperience";
import PersonalProject from "./PersonalProject";
import CourseEnrolled from "./CoursePublish";

function ProfileInstructor({ userProfile }) {
  const {
    self_introduce,
    degrees,
    working_history,
    projects,
    course_enrolled,
  } = userProfile;
  return (
    <>
      <GlobalStyle />
      <GeneralHeader />
      <ProfileInstructorWrapper className="container">
        <ContactInfo userProfile={userProfile} />
        <AboutMe self_introduce={self_introduce} />
        <Education degrees={degrees} />
        <WorkExperience working_history={working_history} />
        <PersonalProject projects={projects} />
        <CourseEnrolled course_enrolled={course_enrolled} />
      </ProfileInstructorWrapper>
      <GeneralFooter />
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F1F3F5 !important;
  }
`;

const ProfileInstructorWrapper = styled.main`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default ProfileInstructor;
