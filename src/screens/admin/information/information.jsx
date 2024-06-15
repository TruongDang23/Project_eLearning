//This is information screen of admin
import { useState } from 'react'
import { GeneralFooter, HeaderAfterLogin } from '~/components/general'
import styled from 'styled-components'
import UserProfile from './UserProfile'
import UserActivity from './HistoryActivity'

function Information() {
  const user = {
    avatar: 'https://via.placeholder.com/150',
    userID: 'user123',
    fullname: 'John Doe',
    dob: '1990-01-01',
    street: '123 Main St',
    province: 'Ontario',
    country: 'Canada',
    language: 'English',
    socialNetworks: {
      facebook: 'john.doe',
      twitter: 'johndoe',
      instagram: 'johndoe'
    },
    status: 'Active'
  };

  const activities = [
    'Logged in',
    'Updated profile picture',
    'Posted a new status',
    'Liked a post',
    'Commented on a post'
  ];
  return (
    <>
      <div>
        <HeaderAfterLogin />
        <main>
          <Container>
            <RightPane>
              <UserProfile user={user} />
            </RightPane>
            <LeftPane>
              <UserActivity activities={activities} />
            </LeftPane>
          </Container>
        </main>
        <GeneralFooter />
      </div>
    </>
  )
}

export default Information
const Container = styled.div`
  width: 1450px;
  margin: 0 auto;
  display: grid;
  height:100vh;
  overflow-y: auto;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 4.8rem;

  @media (max-width: 1200px) {
    width: 80%;
  }

  @media (max-width: 992px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 95%;
    flex-direction: column;
    height: auto;
  }

  @media (max-width: 576px) {
    width: 100%;
    padding: 0 10px;
  }
`;

const LeftPane = styled.div`
  flex: 2;
  padding: 20px;
  border-right: 1px solid #ddd;
  overflow-y: auto;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
`;

const RightPane = styled.div`
  flex: 1;
  padding: 20px;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
`;