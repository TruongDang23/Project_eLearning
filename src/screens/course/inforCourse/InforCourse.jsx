import { GeneralHeader } from '~/components/general'
import FooterNew from '~/components/general/Footer/FooterNew'
import IntroCourse from './IntroCourse'
import MainCourse from './MainCourse'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '~/screens/system/Loading'

import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

function InforCourse() {
  const [isLoad, setIsLoad] = useState(true) //Data is loading
  const { courseID } = useParams()
  const [inforCourseData, setInforCourseData] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get('http://localhost:3000/c/loadInforCourse', {
        params: {
          courseID
        }
      })
      .then((response) => {
        setInforCourseData(response.data[0])
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
            <title>
              {inforCourseData
                ? `${inforCourseData.title} | EL-Space`
                : 'Course Details'}
            </title>
          </Helmet>
          <div>
            <GeneralHeader />
            <main>
              <IntroCourse inforCourseData={inforCourseData} />
              <MainCourse inforCourseData={inforCourseData} />
            </main>
            <FooterNew />
          </div>
        </>
      )}
    </>
  )
}

export default InforCourse
