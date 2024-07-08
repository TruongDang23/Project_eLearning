function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.answers.map((answers, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          key={answers}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {answers}
        </button>
      ))}
    </div>
  );
}

export default Options;
