import React, { useEffect, useState } from 'react';

const Timer = ({ duration, onFinish, start }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!start) return;
    setTime(0);
    const interval = setInterval(() => {
      setTime(t => {
        if (t + 1 >= duration) {
          clearInterval(interval);
          onFinish();
        }
        return t + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [start, duration, onFinish]);

  return <h5>Time: {time}s / {duration}s</h5>;
};

export default Timer;
