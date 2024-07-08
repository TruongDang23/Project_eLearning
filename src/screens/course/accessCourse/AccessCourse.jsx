import { HeaderAfterLogin } from "~/components/general";
import FooterNew from "~/components/general/Footer/FooterNew";
import CourseBanner from "./CourseBanner";
import MainAccessCourse from "./MainAccessCourse";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

function AccessCourse() {
  const [isLoad, setIsLoad] = useState(true) //Data is loading
  const { courseID } = useParams();
  const [accessCourseData, setAccessCourseData] = useState()

  useEffect(() => {
    axios.get('http://localhost:3000/c/loadDetailsCourse', {
      params: {
        courseID
      }
    })
      .then(response => {
        setAccessCourseData(response.data[0])
        setIsLoad(false) //Data is loaded successfully
      })
      .catch(error => {
        alert('Lỗi đọc dữ liệu: ' + error)
        setIsLoad(false)
      })
  }, [courseID])

  return (
    <>
      <HeaderAfterLogin />
      <main>
        {
          //Ràng điều kiện nếu dữ liệu đang load thì ko gọi thẻ UserProfile
          //Vì react chạy bất đồng bộ nên chưa có dữ liệu mà gọi thẻ là sẽ bị null
          isLoad ? ( <p>Loading...</p> ) :
            (
              <>
                <CourseBanner accessCourseData={accessCourseData} />
                <MainAccessCourse accessCourseData={accessCourseData} />
              </>
            )
        }
      </main>
      <FooterNew />
    </>
  );
}

export default AccessCourse;
