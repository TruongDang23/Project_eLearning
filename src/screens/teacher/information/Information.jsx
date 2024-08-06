//This is information screen of admin
import { GeneralFooter, GeneralHeader } from '~/components/general'
import styled from 'styled-components'
import UserProfile from './UserProfile'
import ExtraProfile from './ExtraProfile'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loading from "~/screens/system/Loading"

function Information() {

  const [userProfile, setUserProfile] = useState()
  const navigate = useNavigate()
  const [isLoad, setIsLoad] = useState(true) //Data is loading
  const token = localStorage.getItem('token')
  const userAuth = localStorage.getItem('userAuth')
  const updateInformation = (newProfile) => {
    setUserProfile(newProfile)
  }

  useEffect(() => {
    axios.get('http://localhost:3000/in/loadInformation', {
      headers: {
        'Token': token, // Thêm token và user vào header để đưa xuống Backend xác thực
        'User': userAuth
      }
    })
      .then(response => {
        setUserProfile(response.data)
        setIsLoad(false) //Data is loaded successfully
      })
      .catch(error => {
        //Server shut down
        if (error.message === 'Network Error')
          navigate('/server-shutdown')
        //Connection error
        if (error.response.status === 500)
          navigate('/500error')
        //Unauthorized. Need login
        if (error.response.status === 401)
          navigate('/401error')
        //Forbidden. Token != userAuth
        if (error.response.status === 403)
          navigate('/403error')
        setIsLoad(false)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {
        isLoad ? (<Loading/>) :
          (
            <>
              <div>
                <GeneralHeader />
                <main>
                  <Container>
                    <LeftPane>
                      <UserProfile profile={ userProfile } setProfile={updateInformation}/>
                    </LeftPane>
                    <RightPane>
                      <ExtraProfile profile={ userProfile } setProfile={updateInformation}/>
                    </RightPane>
                  </Container>
                </main>
                <GeneralFooter />
              </div>
            </>
          )
      }
    </>
  )
}

export default Information
const Container = styled.div`
  width: 1450px;
  margin: 0 auto;
  display: grid;
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