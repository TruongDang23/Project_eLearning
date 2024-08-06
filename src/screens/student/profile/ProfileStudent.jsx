import React from "react";
import styled from "styled-components";

import { GeneralHeader } from "~/components/general";
import { GeneralFooter } from "~/components/general";

function ProfileStudent({ userProfile }) {
  const { fullname } = userProfile;
  return (
    <>
      <GeneralHeader />
      <ProfileStudentWrapper>
        <div>
          <h1>Profile Student</h1>
          <p>Username: {fullname}</p>
        </div>
      </ProfileStudentWrapper>
      <GeneralFooter />
    </>
  );
}

const ProfileStudentWrapper = styled.main``;

export default ProfileStudent;
