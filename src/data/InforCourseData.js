import videoIntro from "../assets/inforCourseIntro.mp4";
import imageIntro from "../assets/imageIntro.png";

const InforCourseData = {
  instructor: "John Doe",
  type_of_course: "Course",
  title: "Introduction to Database",
  method: "Self-directed study",
  language: "English",
  price: 49.99,
  currency: "USD",
  program: "Knowledge",
  category: "Database",
  course_for: "Beginner",
  status: "published",
  num_lecture: 10,
  star: 4.5,
  image_introduce: imageIntro,
  video_introduce: videoIntro,
  keywords: ["Database", "SQL", "Beginner"],
  targets: [
    "Understand basic database concepts",
    "Write simple SQL queries",
    "Design a simple database",
  ],
  requirements: [
    "Basic understanding of computer science",
    "No prior knowledge of databases is required",
  ],
  chapters: [
    {
      chapter_name: "Introduction",
      lectures: [
        {
          id: 1,
          name: "What is a Database?",
          description: "Overview of databases",
          type: "video",
          source: "https://example.com/lecture1.mp4",
          QnA: [
            {
              questionerID: 1,
              question:
                "What is the difference between a database and a spreadsheet?",
              date: "2024-06-01 10:00:00",
              responses: [
                {
                  responseID: 2,
                  response:
                    "A database can handle more complex queries and is more scalable.",
                  date: "2024-06-01 11:00:00",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: "Database Management Systems",
          description: "Introduction to DBMS",
          type: "file",
          source: "https://example.com/lecture2.pdf",
          QnA: [],
        },
      ],
    },
    {
      chapter_name: "SQL",
      lectures: [
        {
          id: 3,
          name: "Introduction to SQL",
          description: "Overview of SQL",
          type: "video",
          source: "https://example.com/lecture3.mp4",
          QnA: [],
        },
        {
          id: 4,
          name: "Basic SQL Queries",
          description: "Introduction to SQL queries",
          type: "file",
          source: "https://example.com/lecture4.pdf",
          QnA: [],
        },
      ],
    },
  ],
  review: [
    {
      reviewerName: "Lê Thành Vinh",
      message:
        "Great course! The instructor explains concepts clearly and concisely.",
      star: 4.5,
      date: "2024-06-01 12:00:00",
    },
    {
      reviewerName: "Đặng Quang Trường",
      message: "I learned a lot from this course.",
      star: 4.0,
      date: "2024-06-01 13:00:00",
    },
  ],
};

export default InforCourseData;
