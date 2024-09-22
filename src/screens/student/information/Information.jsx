//This is information screen of admin
import { GeneralFooter, GeneralHeader } from '~/components/general'
import styled from 'styled-components'
import UserProfile from './UserProfile'
import ExtraProfile from './ExtraProfile'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loading from '~/screens/system/Loading'

import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

function Information() {
  const [userProfile, setUserProfile] = useState()
  const navigate = useNavigate()
  const updateInformation = (newProfile) => {
    setUserProfile(newProfile)
  }
  const [isLoad, setIsLoad] = useState(true) //Data is loading
  const token = localStorage.getItem('token')
  const userAuth = localStorage.getItem('userAuth')

  useEffect(() => {
    axios
      .get('http://localhost:3000/st/loadInformation', {
        headers: {
          Token: token, // Thêm token và user vào header để đưa xuống Backend xác thực
          User: userAuth
        }
      })
      .then((response) => {
        setUserProfile(response.data)
        setIsLoad(false) //Data is loaded successfully
      })
      .catch((error) => {
        //Server shut down
        if (error.message === 'Network Error') navigate('/server-shutdown')
        //Connection error
        else if (error.response.status === 500) navigate('/500error')
        //Unauthorized. Need login
        else if (error.response.status === 401) navigate('/401error')
        //Forbidden. Token != userAuth
        else if (error.response.status === 403) navigate('/403error')
        else navigate('/error-get-data')
        setIsLoad(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //console.log(userProfile)
  return (
    <>
      {isLoad ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>Information | El-Space</title>
          </Helmet>
          <GeneralHeader />
          <main>
            
            <Container className="container">
              <LeftPane>
                <UserProfile
                  profile={userProfile}
                  setProfile={updateInformation}
                />
              </LeftPane>
              <RightPane>
                <ExtraProfile
                  profile={userProfile}
                  setProfile={updateInformation}
                />
              </RightPane>
            </Container>
          </main>
          <GeneralFooter />
        </>
      )}
    </>
  )
}

const Container = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const RightPane = styled.div`
  padding: 24px;
  background-color: #fff;
  box-shadow: #0000000f 0px 4px 20px 0px;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transition: all ease 0.3s;
  }
`

const LeftPane = styled.div`
  padding: 24px;
  background-color: #fff;
  box-shadow: #0000000f 0px 4px 20px 0px;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transition: all ease 0.3s;
  }
`

export default Information
