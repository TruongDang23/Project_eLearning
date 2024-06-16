//This is information screen of admin
import { GeneralFooter, HeaderAfterLogin } from '~/components/general'
import styled from 'styled-components'
import UserProfile from './UserProfile'
import ExtraProfile from './ExtraProfile'

function Information() {

  const userProfile = [
    {
      userID: 'S000',
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
      activity_status: 'active'
    }
  ]

  return (
    <>
      <div>
        <HeaderAfterLogin />
        <main>
          <Container>
            <LeftPane>
              <UserProfile profile={ userProfile }/>
            </LeftPane>
            <RightPane>
              <ExtraProfile/>
            </RightPane>
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

const RightPane = styled.div`
  flex: 2;
  padding: 20px;
  border-right: 1px solid #ddd;
  overflow-y: auto;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
`;

const LeftPane = styled.div`
  flex: 1;
  padding: 20px;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
`;