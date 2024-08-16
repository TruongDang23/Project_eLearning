import React from "react";
import { useState } from "react";
import styled from "styled-components";

import SearchIcon from "@mui/icons-material/Search";

// import courseQA from "~/data/QAdata";

const initialQA = [
  {
    id: 1,
    content: "What are the prerequisites for this course?",
    author: "John Doe",
    date: "2024-08-16",
    avatar: "https://i.scdn.co/image/ab67616100005174ba025c8f62612b2ca6bfa375",
    replies: [
      {
        id: 2,
        content:
          "You should have a basic understanding of HTML, CSS, and JavaScript before taking this course.",
        author: "Instructor",
        date: "2024-08-17",
        avatar:
          "https://images-na.ssl-images-amazon.com/images/I/61JGEsK4g7L.jpg",
        replies: [
          {
            id: 3,
            content:
              "Where can I learn the basics of HTML, CSS, and JavaScript?",
            author: "Jane Smith",
            date: "2024-08-18",
            avatar:
              "https://images-na.ssl-images-amazon.com/images/I/61JGEsK4g7L.jpg",
            replies: [
              {
                id: 4,
                content:
                  "You can find beginner tutorials on platforms like freeCodeCamp, Codecademy, or W3Schools.",
                author: "Instructor",
                date: "2024-08-19",
                avatar:
                  "https://i.pinimg.com/474x/60/a6/6d/60a66dd9cbce9629b40941f5d0c5cdd6.jpg",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    content: "How long is the course?",
    author: "Mike Brown",
    date: "2024-08-20",
    avatar:
      "https://i.pinimg.com/474x/60/a6/6d/60a66dd9cbce9629b40941f5d0c5cdd6.jpg",
    replies: [
      {
        id: 6,
        content:
          "The course is designed to be completed in 6 weeks with an estimated study time of 3-4 hours per week.",
        author: "Instructor",
        date: "2024-08-21",
        avatar:
          "https://i.pinimg.com/474x/60/a6/6d/60a66dd9cbce9629b40941f5d0c5cdd6.jpg",
        replies: [
          {
            id: 7,
            content: "Can I complete the course faster?",
            author: "Sarah Lee",
            date: "2024-08-22",
            avatar:
              "https://i.pinimg.com/474x/60/a6/6d/60a66dd9cbce9629b40941f5d0c5cdd6.jpg",
            replies: [
              {
                id: 8,
                content:
                  "Yes, you can go at your own pace and complete the course faster if you wish.",
                author: "Instructor",
                date: "2024-08-23",
                avatar:
                  "https://i.pinimg.com/474x/60/a6/6d/60a66dd9cbce9629b40941f5d0c5cdd6.jpg",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

function TabQA() {
  const [courseQA, setCourseQA] = useState(initialQA);
  const [newReply, setNewReply] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const handleReplyChange = (e) => setNewReply(e.target.value);

  const handleReplySubmit = (questionId) => {
    const updatedQA = courseQA.map((QA) => {
      if (QA.id === questionId) {
        return {
          ...QA,
          replies: [
            ...QA.replies,
            {
              id: QA.replies.length + 1,
              content: newReply,
              author: "Your Name", // Thay thế bằng tên người dùng
              date: new Date().toISOString().split("T")[0], // Ngày hiện tại
              avatar:
                "https://i.pinimg.com/474x/60/a6/6d/60a66dd9cbce9629b40941f5d0c5cdd6.jpg", // Avatar placeholder
              replies: [],
            },
          ],
        };
      }
      return QA;
    });
    setCourseQA(updatedQA);
    setNewReply("");
    setSelectedQuestionId(null);
  };

  return (
    <TabQAWrapper>
      <div className="QA-filter">
        <div className="QA-filter-sortby">
          <h3>Sort by:</h3>
          <select>
            <option value="recent">Sort by most recent</option>
            <option value="oldest">Sort by oldest</option>
          </select>
        </div>
        <div className="QA-filter-question">
          <h3>Filter Question:</h3>
          <select>
            <option value="all">All</option>
            <option value="answered">Answered</option>
            <option value="unanswered">Unanswered</option>
            <option value="me">Question I asked</option>
          </select>
        </div>
        <div className="QA-filter-search">
          <h3>Or:</h3>
          <div className="QA-filter-search_box">
            <input type="text" placeholder="Search question..." />
            <button>
              <SearchIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
        </div>
      </div>
      <div className="QA-list-question">
        <h3>All questions:</h3>
        <div className="QA-question-content">
          {courseQA.map((QA) => (
            <div key={QA.id} className="QA-question-item">
              <div className="QA-question-item-header">
                <div className="QA-question-item-header__avatar">
                  <img src={QA.avatar} alt="avatar" />
                </div>
                <div className="QA-question-item-header__info">
                  <h4>{QA.author}</h4>
                  <span>{QA.date}</span>
                </div>
              </div>
              <div className="QA-question-item-content">
                <p>{QA.content}</p>
              </div>
              <div className="QA-question-item-reply">
                <div className="QA-question-item-reply-content">
                  {QA.replies.map((reply) => (
                    <div key={reply.id} className="QA-question-item-reply-item">
                      <div className="QA-question-item-reply-item-header">
                        <div className="QA-question-item-reply-item-header__avatar">
                          <img src={reply.avatar} alt="avatar" />
                        </div>
                        <div className="QA-question-item-reply-item-header__info">
                          <h4>{reply.author}</h4>
                          <span>{reply.date}</span>
                        </div>
                      </div>
                      <div className="QA-question-item-reply-item-content">
                        <p>{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedQuestionId === QA.id ? (
                  <div className="QA-question-item-reply-input">
                    <textarea
                      value={newReply}
                      onChange={handleReplyChange}
                      placeholder="Write your reply here..."
                    />
                    <button onClick={() => handleReplySubmit(QA.id)}>
                      Submit Reply
                    </button>
                  </div>
                ) : (
                  <div className="QA-question-item-reply-button">
                    <button onClick={() => setSelectedQuestionId(QA.id)}>
                      Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="QA-ask-question">
        <h3>Ask a question:</h3>
        <textarea placeholder="Write your question here..." />
        <button>Submit</button>
      </div>
    </TabQAWrapper>
  );
}
const TabQAWrapper = styled.div`
  .QA-filter {
    display: flex;
    gap: 20px;
    ${"" /* padding: 20px; */}
    ${"" /* background-color: red; */}
    margin-bottom: 20px;
    .QA-filter-sortby,
    .QA-filter-question,
    .QA-filter-search {
      display: flex;
      flex-direction: column;
      gap: 5px;
      h3 {
        font-size: 1.6rem;
        color: #333;
        font-weight: 700;
        margin-right: 10px;
      }
      select {
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-right: 10px;
        option {
          font-size: 1.6rem;
        }
      }
      input {
        padding: 5px 10px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border: 1px solid #ccc;
      }
      button {
        padding: 5px 10px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        background-color: #1971c2;
        color: #fff;
        border: none;
        cursor: pointer;
      }
      .QA-filter-search_box {
        display: flex;
      }
    }
    ${"" /* QA-filter-search nằm về phía cuối của QA-filter */}
    .QA-filter-search {
      margin-left: auto;
    }
  }

  .QA-list-question {
    h3 {
      font-size: 1.8rem;
      color: #333;
      font-weight: 700;
    }
    .QA-question-content {
      .QA-question-item {
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        .QA-question-item-header {
          display: flex;
          gap: 10px;
          .QA-question-item-header__avatar {
            img {
              width: 50px;
              height: 50px;
              object-fit: cover;
              border-radius: 50%;
            }
          }
          .QA-question-item-header__info {
            h4 {
              font-size: 1.6rem;
              font-weight: 700;
              color: #333;
            }
            span {
              font-size: 1.4rem;
              color: #666;
            }
          }
        }
        .QA-question-item-content {
          margin-top: 10px;
          p {
            font-size: 1.6rem;
            line-height: 1.6;
          }
        }
        .QA-question-item-reply {
          margin-top: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          .QA-question-item-reply-content {
            display: flex;
            flex-direction: column;
            .QA-question-item-reply-item {
              margin-top: 10px;
              padding: 10px;
              ${"" /* border: 1px solid #ccc; */}
              border-radius: 5px;
              .QA-question-item-reply-item-header {
                display: flex;
                gap: 10px;
                .QA-question-item-reply-item-header__avatar {
                  img {
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    border-radius: 50%;
                  }
                }
                .QA-question-item-reply-item-header__info {
                  h4 {
                    font-size: 1.6rem;
                    font-weight: 700;
                    color: #333;
                  }
                  span {
                    font-size: 1.4rem;
                    color: #666;
                  }
                }
              }
              .QA-question-item-reply-item-content {
                margin-top: 10px;
                p {
                  font-size: 1.6rem;
                  line-height: 1.6;
                }
              }
            }
          }
          .QA-question-item-reply-input {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            textarea {
              width: 100%;
              height: 100px;
              padding: 10px;
              margin-top: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
            }
            button {
              padding: 10px 20px;
              background-color: #1971c2;
              color: #fff;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              margin-top: 10px;
              margin-left: auto;
            }
          }
          .QA-question-item-reply-button {
            display: flex;
            justify-content: flex-end;
            button {
              padding: 10px 20px;
              background-color: #1971c2;
              color: #fff;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              margin-left: auto;
            }
          }
        }
      }
    }
  }

  .QA-ask-question {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    h3 {
      font-size: 1.8rem;
      color: #333;
      font-weight: 700;
    }
    textarea {
      width: 100%;
      height: 100px;
      padding: 10px;
      margin-top: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    button {
      padding: 10px 20px;
      background-color: #1971c2;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
      margin-left: auto;
    }
  }
`;

export default TabQA;
