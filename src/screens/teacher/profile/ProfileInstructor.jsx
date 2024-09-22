import styled, { createGlobalStyle } from 'styled-components'

import { GeneralHeader } from '~/components/general'
import { GeneralFooter } from '~/components/general'

import ContactInfo from './ContactInfo'
import AboutMe from './AboutMe'
import Education from './Education'
import WorkExperience from './WorkExperience'
import PersonalProject from './PersonalProject'
import CourseEnrolled from './CoursePublish'
import Loading from '~/screens/system/Loading'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

function ProfileInstructor() {
  const [userProfiles, setUserProfile] = useState()
  const navigate = useNavigate()

  const [isLoad, setIsLoad] = useState(true) //Data is loading
  const token = localStorage.getItem('token')
  const userAuth = localStorage.getItem('userAuth')

  useEffect(() => {
    axios
      .get('http://localhost:3000/in/loadProfile', {
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
        if (error.response.status === 500) navigate('/500error')
        //Unauthorized. Need login
        if (error.response.status === 401) navigate('/401error')
        //Forbidden. Token != userAuth
        if (error.response.status === 403) navigate('/403error')
        setIsLoad(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoad ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>Profile | EL-Space</title>
          </Helmet>
          <GlobalStyle />
          <GeneralHeader />
          <ProfileInstructorWrapper className="container">
            <ContactInfo userProfile={userProfiles} />
            <AboutMe self_introduce={userProfiles.self_introduce} />
            <Education degrees={userProfiles.degrees} />
            <WorkExperience working_history={userProfiles.working_history} />
            <PersonalProject projects={userProfiles.projects} />
            <CourseEnrolled course_enrolled={userProfiles.course_published} />
          </ProfileInstructorWrapper>
          <GeneralFooter />
        </>
      )}
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F1F3F5 !important;
  }
`

const ProfileInstructorWrapper = styled.main`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export default ProfileInstructor
