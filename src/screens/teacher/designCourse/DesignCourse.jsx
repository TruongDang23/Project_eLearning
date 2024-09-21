import { GeneralHeader } from '~/components/general'
import FooterNew from '~/components/general/Footer/FooterNew'
import styled, { createGlobalStyle } from 'styled-components'
import Sticky from 'react-sticky-el'

import MainDesignCourse from './MainDesignCourse'
import Sidebar from './Sidebar'
import { DesignCourseProvider } from './DesignCourseContext'

import { useEffect, useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function DesignCourse() {
  const formData = new FormData()

  const token = localStorage.getItem('token')
  const userAuth = localStorage.getItem('userAuth')
  const navigate = useNavigate()

  const [save, setSave] = useState(true) //flag variable. Its will be change whenever user click Save in order to create course

  const [structure, setStructure] = useState({
    //Data in mongoDB
    image_introduce: '',
    video_introduce: '',
    keywords: [],
    targets: [],
    requirements: [],
    chapters: [],

    //Data in mysql
    type_of_course: 'Course',
    title: '',
    method: '',
    language: '',
    price: '',
    currency: '',
    program: '',
    category: '',
    course_for: '',
    userID: '',
    //status: '', status sẽ được xử lý dưới backend
    num_lecture: 0 //num_lecture sẽ phụ thuộc vào độ dài của chapters
  })
  console.log('structure: ', structure)

  useEffect(() => {
    formData.append("image", structure.image_introduce)
    //formData.append("image", structure.video_introduce)
    console.log(structure.image_introduce)
    
    axios.post(
      "http://localhost:3000/c/uploadpdf",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Token: token,
          user: userAuth
        }
      }
    )
      .then(response => {
        console.log(response)
      // setUserProfile(response.data)
      // setIsLoad(false) //Data is loaded successfully
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
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [save])

  return (
    <DesignCourseProvider>
      <GlobalStyle />
      <GeneralHeader />
      <DesignCourseWrapper>
        <Sticky disabled={window.innerWidth <= 768}>
          <Sidebar setFlag={setSave}/>
        </Sticky>
        <MainDesignCourse setStructure={setStructure}/>
      </DesignCourseWrapper>
      <FooterNew />
    </DesignCourseProvider>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f9f9f9 !important;
  }
`

const DesignCourseWrapper = styled.main`
  margin: 20px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    .sticky{
      display: none;
    }
  }

  @media (max-width: 1024px) {
    margin: 10px;
  }

  @media (max-width: 768px) {
    margin: 5px;
  }

  @media (max-width: 480px) {
    margin: 0;
  }
`

export default DesignCourse
