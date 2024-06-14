import styled from "styled-components";
import StarRating from "./StarRating";

function Course({ course }) {
  const {
    course_id,
    type_of_course,
    title,
    description,
    price,
    rating_star,
    rating_count,
    imgSrc,
    creater,
  } = course;
  return (
    <CourseWrapper>
      <div className="item-img">
        <img src={imgSrc} alt={title} />
      </div>
      <div className="item-body">
        <h3 className="item-title">{title}</h3>
        <span className="item-creator">{creater}</span>
        <div className="item-rating">
          <span className="rating-star-val">{rating_star}</span>
          <StarRating rating_star={rating_star} />
          <span className="rating-count">({rating_count})</span>
        </div>
        <div className="item-price">
          <span className="item-price-new">Free</span>
          <span className="item-price-old">${price}</span>
        </div>
      </div>
      <div className="item-btns">
        <button className="item-btn see-details-btn">See Details</button>
        <button className="item-btn add-to-cart-btn">Add to Cart</button>
      </div>
    </CourseWrapper>
  );
}

const CourseWrapper = styled.div`
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .item-img {
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      ${"" /* bo hai góc trên của ảnh */}
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
  .item-body {
    margin: 14px 0;
    padding: 4px 18px;

    .item-title {
      font-size: 1.8rem;
      line-height: 1.4;
      font-weight: 700;
      color: #333;
    }
    .item-creator {
      font-size: 1.6rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
    }
    .item-rating {
      margin-top: 8px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .rating-star-val {
        font-size: 1.6rem;
        font-weight: 800;
        color: #b4690e;
        margin-right: 6px;
      }
      .rating-count {
        font-size: 1.6rem;
        margin-left: 3px;
        font-weight: 500;
        opacity: 0.8;
      }
    }
    .item-price-new {
      font-weight: 700;
      font-size: 1.6rem;
    }
    .item-price-old {
      opacity: 0.8;
      font-weight: 500;
      text-decoration: line-through;
      font-size: 1.6rem;
      margin-left: 8px;
    }
  }

  .item-btns {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    padding: 4px 8px 20px 18px;
    margin-top: auto;
    .item-btn {
      display: inline-block;
      font-size: 1.6rem;
      padding: 1rem 2rem;
      font-weight: 700;
      border-radius: 5px;
      text-decoration: none;
      transition: all 0.3s;

      &.see-details-btn {
        background-color: #1971c2;
        color: #fff;
        border: none;
        &:hover {
          background-color: #155b96;
          transition: all 0.3s;
        }
      }

      &.add-to-cart-btn {
        background-color: #fff;
        color: #1971c2;
        border: 1px solid #1971c2;
        margin-left: 10px;
        &:hover {
          background-color: #1971c2;
          color: #fff;
          transition: all 0.3s;
        }
      }
    }
  }
`;

export default Course;
