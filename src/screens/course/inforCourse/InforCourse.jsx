import { GeneralHeader } from "~/components/general";
import FooterNew from "~/components/general/Footer/FooterNew";
import IntroCourse from "./IntroCourse";
import MainCourse from "./MainCourse";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

function InforCourse() {
  const [isLoad, setIsLoad] = useState(true) //Data is loading
  const { courseID } = useParams();
  const [inforCourseData, setInforCourseData] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3000/c/loadInforCourse', {
      params: {
        courseID
      }
    })
      .then(response => {
        setInforCourseData(response.data[0])
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
    <div>
      <GeneralHeader />
      <main>
        {
          //Ràng điều kiện nếu dữ liệu đang load thì ko gọi thẻ UserProfile
          //Vì react chạy bất đồng bộ nên chưa có dữ liệu mà gọi thẻ là sẽ bị null
          isLoad ? ( <p>Loading...</p> ) :
            (
              <>
                <IntroCourse inforCourseData={inforCourseData} />
                <MainCourse inforCourseData={inforCourseData} />
              </>
            )
        }

      </main>
      <FooterNew />
    </div>
  );
}

export default InforCourse;
