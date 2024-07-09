const QuizzData = {
  name: "Quizz about Introduction",
  description: "Test your knowledge",
  type: "quizz",
  passpoint: 2,
  during_time: 7,
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
      question: "What is the difference between a database and a spreadsheet?",
      answers: [
        "A database can handle more complex queries and is more scalable.",
        "A spreadsheet can handle more complex queries and is more scalable.",
        "A database can handle more complex queries and is less scalable.",
      ],
      key: 0,
    },
  ],
};

export default QuizzData;
