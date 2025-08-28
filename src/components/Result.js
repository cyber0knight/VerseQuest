import React from 'react';

const Result = ({ target, time, restartPractice }) => {
  return (
    <div className="text-center mt-5">
      <h2>Well Done!</h2>
      <p>
        You found: <strong>{target.book} {target.chapter}:{target.verse}</strong>
      </p>
      <p>Time taken: <strong>{time}s</strong></p>
      <button className="btn btn-success mt-3" onClick={restartPractice}>
        Retry
      </button>
    </div>
  );
};

export default Result;
