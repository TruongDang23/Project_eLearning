//This is information screen of admin
import { GeneralFooter, HeaderAfterLogin } from '~/components/general'
import styled from 'styled-components'
import UserProfile from './UserProfile'
import ExtraProfile from './ExtraProfile'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Information() {

  const [userProfile, setUserProfile] = useState(
    {
      userID: 'S000',
      avatar: 'https://wallpapercave.com/wp/wp7046651.jpg',
      fullname: 'Đặng Quang Trường',
      date_of_birth: '2003-01-05',
      street: 'Lý Thái Tổ',
      province: 'Đồng Nai',
      country: 'Việt Nam',
      language: 'English',
      social_network:
      [
        'https://www.facebook.com',
        'https://www.github.com',
        'https://www.youtube.com'
      ],
      activity_status: 'active',
      self_introduce: 'My name is Dang Quang Truong',
      expertise:
      [
        'C#',
        'OOP',
        'Java',
        'Python'
      ],
      degrees:
      [
        {
          school: 'Harvard University',
          falcuty: 'Computer Science',
          begin_time: '29/05/2002',
          end_time: '21/01/2008'
        },
        {
          school: 'MIT',
          falcuty: 'Mechanical Engineering',
          begin_time: '29/05/2002',
          end_time: '21/01/2008'
        },
        {
          school: 'Stanford University',
          falcuty: 'Electrical Engineering',
          begin_time: '29/05/2002',
          end_time: '21/01/2008'
        }
      ],
      projects:
      [
        {
          title: 'Computer Science',
          link: 'github.com',
          description: 'Work with ML'
        },
        {
          title: 'Computer Science',
          link: 'github.com',
          description: 'Work with ML'
        },
        {
          title: 'Computer Science',
          link: 'github.com',
          description: 'Work with ML'
        }
      ],
      working_history:
      [
        {
          company: 'FPT',
          begin_time: '29/05/2002',
          end_time: '21/01/2008',
          description: 'Funny'
        },
        {
          company: 'FPT',
          begin_time: '29/05/2002',
          end_time: '21/01/2008',
          description: 'Funny'
        },
        {
          company: 'FPT',
          begin_time: '29/05/2002',
          end_time: '21/01/2008',
          description: 'Funny'
        }
      ],
      course_enrolled:
      [
        {
          course_name: 'Database Basic',
          instructor: 'Dang Quang Truong',
          route: 'https://'
        },
        {
          course_name: 'Database Basic',
          instructor: 'Dang Quang Truong',
          route: 'https://'
        },
        {
          course_name: 'Database Basic',
          instructor: 'Dang Quang Truong',
          route: 'https://'
        },
        {
          course_name: 'Database Basic',
          instructor: 'Dang Quang Truong',
          route: 'https://'
        }
      ]
    })

  const updateInformation = (newProfile) => {
    setUserProfile(newProfile)
  }
  const [isLoad, setIsLoad] = useState(true) //Data is loading
  const token = localStorage.getItem('token')
  const userAuth = localStorage.getItem('userAuth')

  useEffect(() => {
    axios.get('http://localhost:3000/st/loadInformation', {
      headers: {
        'Token': token, // Thêm token và user vào header để đưa xuống Backend xác thực
        'User': userAuth
      }
    })
      .then(response => {
        console.log(response.data)
        setUserProfile(response.data)
        setIsLoad(false) //Data is loaded successfully
      })
      .catch(error => {
        alert('Lỗi đọc dữ liệu: ' + error)
        setIsLoad(false)
      })
  }, [token, userAuth])

  return (
    <>
      <div>
        <HeaderAfterLogin />
        <main>
          <Container>
            <LeftPane>
              {
                //Ràng điều kiện nếu dữ liệu đang load thì ko gọi thẻ UserProfile
                //Vì react chạy bất đồng bộ nên chưa có dữ liệu mà gọi thẻ là sẽ bị null
                isLoad ? ( <p>Loading...</p> ) :
                  (
                    <UserProfile profile={ userProfile } setProfile={updateInformation}/>
                  )
              }
            </LeftPane>
            <RightPane>
              {
                //Ràng điều kiện nếu dữ liệu đang load thì ko gọi thẻ UserProfile
                //Vì react chạy bất đồng bộ nên chưa có dữ liệu mà gọi thẻ là sẽ bị null
                isLoad ? ( <p>Loading...</p> ) :
                  (
                    <ExtraProfile profile={ userProfile } setProfile={updateInformation}/>
                  )
              }
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
  overflow-y: auto;
`;