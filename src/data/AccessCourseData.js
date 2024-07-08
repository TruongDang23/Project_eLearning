import videoIntro from "../assets/inforCourseIntro.mp4";
const AccessCourseData = {
  instructor: "John Doe",
  type_of_course: "Course",
  title: "Introduction to Database",
  status: "published",
  program: "Knowledge",
  category: "Database",
  course_for: "Beginner",
  progress: 30,
  star: 4.5,
  number_star: 2,
  keywords: ["Database", "SQL", "Beginner"],
  number_enrolled: 100,
  duration: 10,
  image_introduce:
    "https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0",
  video_introduce:
    "https://storage.googleapis.com/e-learning-bucket/C000/CT01/video1.mp4",
  chapters: [
    {
      chapter_name: "Introduction",
      lectures: [
        {
          id: 1,
          name: "What is a Database?",
          description: "Overview of databases",
          type: "video",
          source:
            "https://storage.googleapis.com/e-learning-bucket/C000/CT01/video1.mp4",
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
          source:
            "https://storage.googleapis.com/e-learning-bucket/C000/CT01/01-intro.pdf",
          QnA: [],
        },
        {
          id: 8,
          name: "Quizz about Introduction",
          description: "Test your knowledge",
          type: "quizz",
          passpoint: 7,
          title: "Introduction to Database",
          questions: [
            {
              questionID: 1,
              question: "What is a database?",
              answers: [
                "A collection of data",
                "A collection of tables",
                "A collection of files",
              ],
              key: 0,
            },
            {
              questionID: 2,
              question: "What is a DBMS?",
              answers: [
                "Database Management System",
                "Database Management Software",
                "Database Management Server",
              ],
              key: 0,
            },
            {
              questionID: 3,
              question: "What is the purpose of a DBMS?",
              answers: [
                "To manage databases",
                "To create databases",
                "To delete databases",
              ],
              key: 0,
            },
            {
              questionID: 4,
              question:
                "What is the difference between a database and a spreadsheet?",
              answers: [
                "A database can handle more complex queries and is more scalable.",
                "A spreadsheet can handle more complex queries and is more scalable.",
                "A database can handle more complex queries and is less scalable.",
              ],
              key: 0,
            },
          ],
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
          source:
            "https://storage.googleapis.com/e-learning-bucket/C000/CT02/video2.mp4",
          QnA: [],
        },
        {
          id: 4,
          name: "Basic SQL Queries",
          description: "Introduction to SQL queries",
          type: "file",
          source:
            "https://storage.googleapis.com/e-learning-bucket/C000/CT02/02-database.pdf",
          QnA: [],
        },
      ],
    },
    {
      chapter_name: "Database Design",
      lectures: [
        {
          id: 5,
          name: "Database Normalization",
          description: "Introduction to database normalization",
          type: "video",
          source:
            "https://storage.googleapis.com/e-learning-bucket/C000/CT03/video3.mp4",
          QnA: [],
        },
        {
          id: 6,
          name: "Entity-Relationship Diagrams",
          description: "Introduction to ER diagrams",
          type: "file",
          source:
            "https://storage.googleapis.com/e-learning-bucket/C000/CT03/03-dbms.pdf",
          QnA: [],
        },
        {
          id: 7,
          name: "Database Design Project",
          description: "Design a simple database",
          type: "assignment",
          source:
            "https://storage.googleapis.com/e-learning-bucket/C000/CT04/04-model.pdf",
          QnA: [],
        },
      ],
    },
  ],
  userProgress: {
    userID: 1,
    progress: [
      {
        lectureID: 1,
        time: "2024-06-01 10:30:00",
        percent: 50.0,
      },
      {
        lectureID: 2,
        time: "2024-06-01 11:30:00",
        percent: 100.0,
      },
      {
        lectureID: 3,
        time: "2024-06-01 12:30:00",
        percent: 0.0,
      },
      {
        lectureID: 4,
        time: "2024-06-01 13:30:00",
        percent: 0.0,
      },
      {
        lectureID: 5,
        time: "2024-06-01 14:30:00",
        percent: 0.0,
      },
      {
        lectureID: 6,
        time: "2024-06-01 15:30:00",
        percent: 0.0,
      },
      {
        lectureID: 7,
        time: "2024-06-01 16:30:00",
        percent: 0.0,
      },
    ],
  },
  review: [
    {
      reviewerName: "Le Thanh Vinh",
      message:
        "Great course! The instructor explains concepts clearly and concisely.",
      star: 4.5,
      date: "2024-06-01 12:00:00",
    },
    {
      reviewerName: "Dang Quang Truong",
      message: "I learned a lot from this course.",
      star: 4.0,
      date: "2024-06-07 13:00:00",
    },
  ],
};

export default AccessCourseData;
