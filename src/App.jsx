import React, { useState, useRef } from "react";

function App() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef();

  const start = () => {
    if (!running) {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(currentTime - startTime);
      }, 10);
      setRunning(true);
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setElapsedTime(0);
    setRunning(false);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setElapsedTime(0);
    if (running) {
      start();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
  };

  const padTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Stopwatch by Ananth</h1>
      <h2 className="text-5xl mb-8">{formatTime(elapsedTime)}</h2>
      <div className="space-x-4">
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          onClick={start}
          disabled={running}
        >
          Start
        </button>
        <button
          className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700"
          onClick={stop}
        >
          Stop
        </button>
        <button
          className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700"
          onClick={pause}
        >
          Pause
        </button>
        <button
          className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
