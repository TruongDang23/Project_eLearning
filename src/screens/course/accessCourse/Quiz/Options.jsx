function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((options, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          key={options}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {options}
        </button>
      ))}
    </div>
  );
}

export default Options;
