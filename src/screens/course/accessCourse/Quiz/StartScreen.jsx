import styled from "styled-components";

function StartScreen({ numberOfQuestions, dispatch }) {
  return (
    <div>
      <h2>Welcome to The React Quizz</h2>
      <h3>{numberOfQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let is start
      </button>
    </div>
  );
}

const StartScreenWrapper = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  h2 {
    font-size: 2.4rem;
    margin-bottom: 1.6rem;
  }
  h3 {
    font-size: 1.8rem;
    margin-bottom: 2.4rem;
  }
  .btn {
    display: block;
    font-family: inherit;
    color: inherit;
    font-size: 2rem;
    border: 2px solid var(--color-dark);
    background-color: var(--color-dark);
    padding: 1.2rem 2.4rem;
    cursor: pointer;
    border-radius: 100px;
    transition: 0.3s;
  }
`;

export default StartScreen;
