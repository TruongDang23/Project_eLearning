import image0 from "./g0.gif";
import image60 from "./g60.gif";
import image80 from "./g80.gif";
import image100 from "./g100.gif";
import styled from "styled-components";

function Finish({ points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = Math.round((points / maxPossiblePoints) * 100, 2);
  let image;
  let emoji;
  if (percentage === 100) {
    emoji = "🎉";
    image = image100;
  } else if (percentage >= 80) {
    emoji = "😄";
    image = image80;
  } else if (percentage >= 60) {
    emoji = "😐";
    image = image60;
  } else {
    emoji = "😢";
    image = image0;
  }
  return (
    <FinishWrapper>
      <p className="result">
        <span>{emoji}</span>
        Your score is <strong>{points}</strong> out of {maxPossiblePoints}{" "}
        question.
      </p>
      <p className="highscore">That is {percentage}%.</p>
      <div className="image-result">
        <img src={image} alt="gif" />
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </FinishWrapper>
  );
}

const FinishWrapper = styled.div`
  margin: 2.4rem;
  padding: 2.4rem;
  .image-result {
    text-align: center;
    margin-bottom: 2.4rem;
    img {
      width: 50%;
    }
  }
  .result {
    color: #fff;
    border-radius: 100px;
    text-align: center;
    padding: 2rem 0;
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1.6rem;
  }
  span {
    font-size: 2.2rem;
    margin-right: 4px;
  }
  .highscore {
    font-size: 2.2rem;
    margin-right: 4px;
  }
  .btn {
    float: right;
    padding: 1rem 2rem;
    font-size: 2rem;
    color: #fff;
    border: 2px solid #495057;
    background-color: #495057;
    padding: 1.2rem 2.4rem;
    cursor: pointer;
    border-radius: 100px;
    transition: all 0.3s ease-in-out;
  }
`;

export default Finish;
