import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import { GeneralHeader } from "~/components/general";
import { GeneralFooter } from "~/components/general";

import ContactInfo from "./ContactInfo";

function ProfileStudent({ userProfile }) {
  const { fullname } = userProfile;
  return (
    <>
      <GlobalStyle />
      <GeneralHeader />
      <ProfileStudentWrapper className="container">
        <ContactInfo userProfile={userProfile} />
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
`;

export default ProfileStudent;
