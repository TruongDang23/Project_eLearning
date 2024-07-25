import styled from "styled-components";

// {
//   //mysql
//   courseID: "C999",
//   type_of_course: "Course",
//   title: "Introduction to Database",
//   method: "Self-directed study",
//   language: "English",
//   price: 0,
//   currency: "USD",
//   program: "Knowledge",
//   category: "Database", // Thông tin này không cần hiển thị lên website (hidden). Chỉ phục vụ cho việc search
//   course_for: "Beginner",
//   num_lectures: 10, // Tổng lectures là bao gồm: Video, Quizz, File, Assignment.
//   instructor: "Đặng Quang Trường",
//   star: 4.5, // Star cắt 0.5 là được nha.
//   num_reviews: 100,

//   //mongoDB
//   image_introduce:
//     "https://png.pngtree.com/template/20220421/ourmid/pngtree-data-analysis-isometric-infographics-layout-with-microchip-wireless-modem-sync-of-image_1300762.jpg",
//   keywords: ["Database", "SQL", "Beginner"],
//   targets: [
//     //Giống Udemy, khi hover vào item khóa học thì sẽ hiển thị kết quả đầu ra của của khóa học đó
//     "Understand basic database concepts",
//     "Write simple SQL queries",
//     "Design a simple database",
//   ],
// }

function CourseCard({ course }) {
  const { title, image_introduce } = course;

  return (
    <CourseCardWrapper>
      <div className="course-card">
        <div className="course-card__img">
          <img src={image_introduce} alt="course" />
        </div>
        <div className="course-card__content">
          <h3>{title}</h3>
          <p>Course Description</p>
        </div>
        <div className="course-card__price">
          <p>Price: Free</p>
        </div>
      </div>
    </CourseCardWrapper>
  );
}

const CourseCardWrapper = styled.div`
  .course-card {
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    .course-card__img {
      width: 30%;
      height: 18rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }
    .course-card__content {
      flex-grow: 1;
      padding: 1rem;
      h3 {
        margin: 0;
        font-size: 1.5rem;
      }
      p {
        margin: 0;
        font-size: 1rem;
      }
    }
    .course-card__price {
      ${"" /* CHỉnh cho class này nằm cuối */}

      padding: 1rem;
      p {
        margin: 0;
        font-size: 1rem;
      }
    }
  }
`;

export default CourseCard;
