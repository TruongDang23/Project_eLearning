//This is information screen of admin
import { GeneralFooter, HeaderAfterLogin } from '~/components/general'
import styled from 'styled-components'
import UserProfile from './UserProfile'
import UserActivity from './HistoryActivity'
import { useState } from 'react'
function Information() {
  const [userProfile, setUserProfile] = useState(
    {
      userID: 'A000',
      avatar: 'https://wallpapercave.com/wp/wp7046651.jpg',
      fullname: 'Đặng Quang Trường',
      date_of_birth: '2003-01-05',
      street: 'Lý Thái Tổ',
      province: 'Đồng Nai',
      country: 'Việt Nam',
      language: 'English',
      social_network: [
        'https://www.facebook.com',
        'https://www.github.com',
        'https://www.youtube.com'
      ],
      activity_status: 'active',
      activities:
      [
        {
          action: 'Logged in',
          time: '2024-01-05 14:30:33'
        },
        {
          action: 'Updated profile picture',
          time: '2024-01-05 14:30:33'
        },
        {
          action: 'Posted a new status',
          time: '2024-01-05 14:30:33'
        },
        {
          action: 'Liked a post',
          time: '2024-01-05 14:30:33'
        },
        {
          action: 'Commented on a post',
          time: '2024-01-05 14:30:33'
        }
      ]
    }
  )

  const updateInformation = (newProfile) => {
    setUserProfile(newProfile)
  }

  return (
    <>
      <div>
        <HeaderAfterLogin />
        <main>
          <Container>
            <RightPane>
              <UserProfile profile={ userProfile } setUserProfile={ updateInformation }/>
            </RightPane>
            <LeftPane>
              <UserActivity profile={ userProfile } setUserProfile={ updateInformation } />
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
  overflow-y: auto;
`;
