import React from "react";
import styled from "styled-components";

import { GeneralHeader } from "~/components/general";
import { GeneralFooter } from "~/components/general";

import ContactInfo from "./ContactInfo";

function ProfileStudent({ userProfile }) {
  const { fullname } = userProfile;
  return (
    <>
      <GeneralHeader />
      <ProfileStudentWrapper className="container">
        <ContactInfo userProfile={userProfile} />
      </ProfileStudentWrapper>
      <GeneralFooter />
    </>
  );
}

const ProfileStudentWrapper = styled.main``;

export default ProfileStudent;
