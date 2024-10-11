import { useState } from "react";
import styled from "styled-components";
import { formatDistanceToNow } from "date-fns";

import SearchIcon from "@mui/icons-material/Search";

function TabQA({ initialQA }) {
  const [courseQA, setCourseQA] = useState(initialQA);
  const [newResponse, setNewResponse] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const handleResponseChange = (e) => setNewResponse(e.target.value);

  const handleResponseSubmit = () => {
    if (newResponse.trim() && replyingTo !== null) {
      const updatedQA = courseQA.map((QA, index) => {
        if (index === replyingTo) {
          const currentDate = new Date();
          // lấy ngày giờ hiện tại và format theo định dạng "yyyy-MM-dd HH:mm:ss"
          const formattedDate = currentDate
            .toLocaleString("sv-SE", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit"
            })
            .replace(" ", " ");

          return {
            ...QA,
            responses: [
              {
                response: newResponse,
                name: "Vinh", // thay đổi bằng tên người dùng ở đây
                date: formattedDate,
                avatar:
                  "https://i.pinimg.com/564x/b3/ce/f7/b3cef71bf4f2247ec504f19885dd15e8.jpg"
              },
              ...QA.responses
            ]
          };
        }
        return QA;
      });

      setCourseQA(updatedQA);
      setNewResponse("");
      setReplyingTo(null);
    }
  };

  const handleReplyClick = (index) => {
    if (replyingTo === index) {
      setReplyingTo(null);
    } else {
      setReplyingTo(index);
    }
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
          {courseQA
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort questions by date
            .map((QA, index) => (
              <div key={index} className="QA-question-item">
                <div className="QA-question-item-header">
                  <div className="QA-question-item-header__avatar">
                    <img src={QA.avatar} alt="avatar" />
                  </div>
                  <div className="QA-question-item-header__info">
                    <h4>{QA.name}</h4>
                    <span>
                      {formatDistanceToNow(new Date(QA.date), {
                        addSuffix: true
                      })}
                    </span>
                  </div>
                </div>
                <div className="QA-question-item-content">
                  <p>{QA.question}</p>
                </div>
                <div className="QA-question-item-reply">
                  <h4>Replies:</h4>
                  <div className="QA-question-item-reply-content">
                    {QA.responses
                      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort responses by date
                      .map((response, responseIndex) => (
                        <div
                          key={responseIndex}
                          className="QA-question-item-reply-item"
                        >
                          <div className="QA-question-item-reply-item-header">
                            <div className="QA-question-item-reply-item-header__avatar">
                              <img src={response.avatar} alt="avatar" />
                            </div>
                            <div className="QA-question-item-reply-item-header__info">
                              <h4>{response.name}</h4>
                              <span>
                                {formatDistanceToNow(new Date(response.date), {
                                  addSuffix: true
                                })}
                              </span>
                            </div>
                          </div>
                          <div className="QA-question-item-reply-item-content">
                            <p>{response.response}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="QA-question-item-reply-button">
                  <button onClick={() => handleReplyClick(index)}>
                    {replyingTo === index ? "Cancel" : "Reply"}
                  </button>
                </div>
                {replyingTo === index && (
                  <div className="QA-question-item-reply-input">
                    <textarea
                      value={newResponse}
                      onChange={handleResponseChange}
                      placeholder="Write your response here..."
                    />
                    <button onClick={handleResponseSubmit}>
                      Submit Response
                    </button>
                  </div>
                )}
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
    animation: fadeIn 0.5s ease-in-out;
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
    animation: fadeIn 0.5s ease-in-out;
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
              margin-left: 10px;
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
        }
        .QA-question-item-reply-input {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          animation: fadeIn 0.5s ease-in-out;
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
            transition: background-color 0.3s;
          }
          button:hover {
            background-color: #135688;
          }
        }
        .QA-question-item-reply-button {
          margin-top: 10px;
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
            transition: background-color 0.3s;
          }
          button:hover {
            background-color: #135688;
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

  @keyframes fadeIn {
    from {
      opacity: 0;
      ${"" /* transform: translateY(10px); */}
    }
    to {
      opacity: 1;
      ${"" /* transform: translateY(0); */}
    }
  }

  @media screen and (max-width: 768px) {
    .QA-filter {
      flex-direction: column;
      gap: 20px;
      .QA-filter-search {
        margin-left: 0;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .QA-filter {
      .QA-filter-sortby,
      .QA-filter-question,
      .QA-filter-search {
        select {
          width: 100%;
        }
      }
      .QA-filter-search {
        .QA-filter-search_box {
          input {
            width: calc(100% - 40px);
          }
          button {
            padding: 5px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 320px) {
    .QA-filter {
      .QA-filter-search {
        .QA-filter-search_box {
          input {
            width: calc(100% - 30px);
          }
        }
      }
    }
  }
`;

export default TabQA;
