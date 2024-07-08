import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import Timer from "./Timer";
import Footer from "./Footer";
import styled from "styled-components";

const SECS_PER_QUESTION = 20;
const initialState = {
  questions: [],
  // 'loading', 'ready', 'error', 'active', 'inactive',...
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secoundsRemaining: null
};
function reducer(state, action) {
  switch (action.type) {
  case "dataReceived":
    return {
      ...state,
      questions: action.payload,
      status: "ready"
    };
  case "dataFailed":
    return {
      ...state,
      status: "error"
    };
  case "start":
    return {
      ...state,
      status: "active",
      secoundsRemaining: state.questions.length * SECS_PER_QUESTION
    };
  case "newAnswer":
    const question = state.questions.at(state.index);
    return {
      ...state,
      answer: action.payload,
      points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points
    };
  case "nextQuestion":
    return {
      ...state,
      index: state.index + 1,
      answer: null
    };
  case "finish":
    return {
      ...state,
      status: "finished",
      highscore:
          state.points > state.highscore ? state.points : state.highscore
    };
  case "restart":
    return {
      ...initialState,
      questions: state.questions,
      status: "ready"
    };
    // return {
    //   ...state,
    //   status: "ready",
    //   index: 0,
    //   answer: null,
    //   points: 0,
    // }
  case "tick":
    return {
      ...state,
      secoundsRemaining: state.secoundsRemaining - 1,
      status: state.secoundsRemaining === 0 ? "finished" : state.status
    };
  default:
    throw new Error(`Unrecognized action: ${action.type}`);
  }
}

function Quizz() {
  const [
    { questions, status, index, answer, points, highscore, secoundsRemaining },
    dispatch
  ] = useReducer(reducer, initialState);
  const numberOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );
  useEffect(function () {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <QuizWrapper>
      <div className="app">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen
              numberOfQuestions={numberOfQuestions}
              dispatch={dispatch}
            />
          )}
          {status === "active" && (
            <>
              <Progress
                index={index}
                numQuestion={numberOfQuestions}
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                answer={answer}
              />
              <Question
                question={questions[index]}
                answer={answer}
                dispatch={dispatch}
              />
              <Footer>
                <Timer
                  dispatch={dispatch}
                  secoundsRemaining={secoundsRemaining}
                />
                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  index={index}
                  numQuestion={numberOfQuestions}
                />
              </Footer>
            </>
          )}
          {status === "finished" && (
            <Finish
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={highscore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </QuizWrapper>
  );
}

const QuizWrapper = styled.div`
  :root {
    --color-darkest: #343a40;
    --color-dark: #495057;
    --color-medium: #ced4da;
    --color-light: #f1f3f5;

    --color-theme: #1098ad;
    --color-accent: #ffa94d;
  }

  @import url("https://fonts.googleapis.com/css2?family=Codystar&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .main {
    width: 50rem;
  }

  .app-header {
    width: 66rem;
    margin-bottom: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .error {
    text-align: center;
    font-size: 1.6rem;
    font-weight: 500;
    padding: 2rem;
    background-color: #495057;
    border-radius: 100px;
  }

  img {
    width: 14rem;
  }

  h1 {
    font-family: "Codystar";
    font-size: 5.6rem;
  }

  h2 {
    font-size: 3.6rem;
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 4rem;
  }

  h4 {
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 2.4rem;
  }

  .start {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .progress {
    margin-bottom: 4rem;
    display: grid;
    justify-content: space-between;
    gap: 1.2rem;
    grid-template-columns: auto auto;
    font-size: 1.8rem;
    color: var(--color-medium);
  }

  progress {
    -webkit-appearance: none;
    width: 100%;
    height: 12px;
    grid-column: 1 / -1;
  }

  ::-webkit-progress-bar {
    background-color: var(--color-medium);
    border-radius: 100px;
  }
  ::-webkit-progress-value {
    background-color: var(--color-theme);
    border-radius: 100px;
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

  .btn:not([disabled]):hover {
    background-color: var(--color-darkest);
  }

  .btn-option:not([disabled]):hover {
    transform: translateX(1.2rem);
  }

  .btn[disabled]:hover {
    cursor: not-allowed;
  }

  .btn-ui {
    float: right;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-bottom: 3.2rem;
  }

  .btn-option {
    width: 100%;
    text-align: left;
  }

  .btn-option.correct {
    background-color: var(--color-theme);
    border: 2px solid var(--color-theme);
    color: var(--color-light);
  }
  .btn-option.wrong {
    background-color: var(--color-accent);
    border: 2px solid var(--color-accent);
    color: var(--color-darkest);
  }

  .answer {
    transform: translateX(2rem);
  }

  .result {
    background-color: var(--color-theme);
    color: var(--color-light);
    border-radius: 100px;
    text-align: center;
    padding: 2rem 0;
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1.6rem;
  }

  .result span {
    font-size: 2.2rem;
    margin-right: 4px;
  }

  .highscore {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 4.8rem;
  }

  .loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4rem;
    gap: 1.6rem;

    color: var(--color-medium);
    font-size: 1.4rem;
  }

  .timer {
    float: left;
    font-size: 1.8rem;
    color: var(--color-medium);
    border: 2px solid var(--color-dark);
    padding: 1.35rem 2.8rem;
    border-radius: 100px;
  }

  /* CREDIT: https://dev.to/afif/i-made-100-css-loaders-for-your-next-project-4eje */
  .loader {
    width: 50px;
    height: 24px;
    background: radial-gradient(circle closest-side, currentColor 90%, #0000) 0%
        50%,
      radial-gradient(circle closest-side, currentColor 90%, #0000) 50% 50%,
      radial-gradient(circle closest-side, currentColor 90%, #0000) 100% 50%;
    background-size: calc(100% / 3) 12px;
    background-repeat: no-repeat;
    animation: loader 1s infinite linear;
  }

  @keyframes loader {
    20% {
      background-position: 0% 0%, 50% 50%, 100% 50%;
    }
    40% {
      background-position: 0% 100%, 50% 0%, 100% 50%;
    }
    60% {
      background-position: 0% 50%, 50% 100%, 100% 0%;
    }
    80% {
      background-position: 0% 50%, 50% 50%, 100% 100%;
    }
  }

  /* ********** */
  /* First counter example */
  .counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    font-size: 2rem;
    font-weight: bold;
    margin: 6rem;
  }

  .counter * {
    font-size: inherit;
    padding: 0.8rem;
  }
`;

export default Quizz;
