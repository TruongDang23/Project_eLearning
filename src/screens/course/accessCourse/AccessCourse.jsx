import { GeneralHeader } from "~/components/general"
import FooterNew from "~/components/general/Footer/FooterNew"
import CourseBanner from "./CourseBanner"
import MainAccessCourse from "./MainAccessCourse"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function AccessCourse() {
  const [isLoad, setIsLoad] = useState(true) //Data is loading
  const [reload, setReload] = useState(false)
  const { courseID } = useParams();
  const [accessCourseData, setAccessCourseData] = useState()
  const token = localStorage.getItem('token')
  const userAuth = localStorage.getItem('userAuth')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/c/loadDetailsCourse', {
      params: {
        courseID
      },
      headers: {
        'Token': token, // Thêm token và user vào header để đưa xuống Backend xác thực
        'User': userAuth
      }
    })
      .then(response => {
        if (response.data === 'Not authorize')
        {
          alert("User can't access this course.")
          navigate(-1)
        }
        else
        {
          setAccessCourseData(response.data[0])
          setIsLoad(false) //Data is loaded successfully
        }
      })
      .catch(error => {
        alert('Lỗi đọc dữ liệu: ' + error)
        setIsLoad(false)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  return (
    <>
      <GeneralHeader />
      <main>
        {
          //Ràng điều kiện nếu dữ liệu đang load thì ko gọi thẻ UserProfile
          //Vì react chạy bất đồng bộ nên chưa có dữ liệu mà gọi thẻ là sẽ bị null
          isLoad ? ( <p>Loading...</p> ) :
            (
              <>
                <CourseBanner accessCourseData={accessCourseData} />
                <MainAccessCourse accessCourseData={accessCourseData} setReload={setReload}/>
              </>
            )
        }
      </main>
      <FooterNew />
    </>
  );
}

export default AccessCourse;
