import { HeaderAfterLogin } from "~/components/general";
import FooterNew from "~/components/general/Footer/FooterNew";
import IntroCourse from "./IntroCourse";
import MainCourse from "./MainCourse";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";

function InforCourse() {
  const [isLoad, setIsLoad] = useState(true) //Data is loading
  const { courseID } = useParams();
  const [inforCourseData, setInforCourseData] = useState()

  useEffect(() => {
    axios.get('http://localhost:3000/c/loadDetailCourse', {
      params: {
        courseID
      }
    })
      .then(response => {
        setInforCourseData(response.data[0])
        setIsLoad(false) //Data is loaded successfully
      })
      .catch(error => {
        alert('Lỗi đọc dữ liệu: ' + error)
        setIsLoad(false)
      })
  }, [courseID])

  return (
    <div>
      <HeaderAfterLogin />
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
