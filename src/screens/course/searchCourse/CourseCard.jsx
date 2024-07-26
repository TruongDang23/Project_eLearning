import styled, { keyframes } from "styled-components";
import StarRating from "~/components/general/Other/StarRating";

function CourseCard({ course }) {
  const {
    title,
    method,
    program,
    image_introduce,
    price,
    currency,
    keywords,
    instructor,
    star,
    num_reviews,
    num_lectures,
    course_for,
  } = course;

  return (
    <CourseCardWrapper>
      <div className="course-card">
        <div className="course-card__img">
          <img src={image_introduce} alt="course" />
        </div>
        <div className="course-card__content">
          <h3>{title}</h3>
          <div className="course-card__content-keyword">
            {keywords.map((keyword, index) => (
              <span key={index}>{keyword}</span>
            ))}
          </div>
          <div className="course-card__content-infor">
            <ul>
              <li>
                <span id="title-infor">Method: </span>
                <span>{method}</span>
              </li>
              <li>
                <span id="title-infor">Program: </span>
                <span>{program}</span>
              </li>
            </ul>
          </div>
          <div className="course-card__content-instructor">
            <span>{instructor}</span>
          </div>
          <div className="course-card__content-vote">
            <span id="star-number">{star} </span>
            <StarRating rating_star={star} />
            <span>({num_reviews} reviews)</span>
          </div>
          <div className="course-card__content-lectures">
            <span>{num_lectures} lectures</span>
            <span>{course_for}</span>
          </div>
        </div>
        <div className="course-card__price">
          {price === 0 ? (
            <p>Free</p>
          ) : (
            <p>
              {price} {currency}
            </p>
          )}
        </div>
      </div>
    </CourseCardWrapper>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CourseCardWrapper = styled.div`
  .course-card {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;
    animation: ${fadeIn} 0.6s ease-out;

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

      @media (max-width: 768px) {
        width: 40%;
      }

      @media (max-width: 576px) {
        width: 30%;
      }
    }

    .course-card__content {
      flex-grow: 1;
      padding: 1rem 2rem;

      h3 {
        color: #333;
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
        line-height: 1.6;
      }

      .course-card__content-keyword {
        margin-bottom: 1rem;
        display: flex;
        gap: 1rem;

        span {
          background-color: #f0f0f0;
          padding: 0.5rem;
          border-radius: 5px;
          font-size: 1rem;
        }
      }

      .course-card__content-infor {
        margin-bottom: 2.5rem;

        ul {
          padding: 0;
          list-style: none;

          li {
            display: inline-block;
            margin-right: 1rem;

            #title-infor {
              font-weight: 700;
              color: #333;
            }

            span {
              font-size: 1.2rem;
              color: #333;
            }
          }
        }
      }

      .course-card__content-instructor {
        margin-bottom: 1rem;

        span {
          font-size: 1.5rem;
          font-weight: 500;
          color: #333;
        }
      }

      .course-card__content-vote {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        span {
          font-size: 1.2rem;
        }

        #star-number {
          font-size: 1.2rem;
          font-weight: 600;
        }
      }

      .course-card__content-lectures {
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;

        span {
          color: #333;
          font-size: 1.2rem;
        }
      }

      @media (max-width: 768px) {
        padding: 1rem;
      }

      @media (max-width: 576px) {
        span {
          font-size: 1rem;
        }
      }
    }

    .course-card__price {
      padding: 2rem 1rem;

      p {
        color: #333;
        margin: 0;
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 1.6;
      }

      @media (max-width: 768px) {
        padding: 1rem;

        p {
          font-size: 1.4rem;
        }
      }

      @media (max-width: 576px) {
        p {
          font-size: 1.2rem;
        }
      }
    }
  }
`;

export default CourseCard;
