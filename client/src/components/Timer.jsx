import React from "react";
import ReactStopwatch from "react-stopwatch";

const Timer = React.memo(() => {
  return (
    <ReactStopwatch
      seconds={0}
      minutes={0}
      hours={0}
      render={({ formatted, hours, minutes, seconds }) => {
        return <span className="badge time">{formatted}</span>;
      }}
    />
  );
});

export default Timer;
