import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import { GeneralHeader } from "~/components/general";
import { GeneralFooter } from "~/components/general";

import ContactInfo from "./ContactInfo";
import AboutMe from "./AboutMe";
import Education from "./Education";
import WorkExperience from "./WorkExperience";
import PersonalProject from "./PersonalProject";

function ProfileStudent({ userProfile }) {
  const { self_introduce, degrees, working_history, projects } = userProfile;
  return (
    <>
      <GlobalStyle />
      <GeneralHeader />
      <ProfileStudentWrapper className="container">
        <ContactInfo userProfile={userProfile} />
        <AboutMe self_introduce={self_introduce} />
        <Education degrees={degrees} />
        <WorkExperience working_history={working_history} />
        <PersonalProject projects={projects} />
      </ProfileStudentWrapper>
      <GeneralFooter />
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F1F3F5 !important;
  }
`;

const ProfileStudentWrapper = styled.main`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default ProfileStudent;
