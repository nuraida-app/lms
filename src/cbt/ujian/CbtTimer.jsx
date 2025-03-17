import React, { useState, useEffect } from "react";
import { useTimeoutQuizMutation } from "../../control/api/logApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const CbtTimer = ({ refresh, isLoading, number, log, bankid }) => {
  const params = useParams();
  const { time } = params;
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState("--:--:--");
  const [startCountdown, setStartCountdown] = useState(false);
  const [endTime, setEndTime] = useState(null);

  const [timeoutQuiz, { isSuccess, error }] = useTimeoutQuizMutation();

  const handleSync = () => {
    localStorage.removeItem("questions");
    refresh();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/cbt-jawdal-ujian`);
      localStorage.removeItem("questions");
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (!log?.log_in) return;

    console.log("log_in", log.log_in);
    console.log("time (in minutes):", Number(time));

    const logInTime = new Date(log.log_in).getTime();
    const duration = Number(time) * 60 * 1000; // Convert time to milliseconds
    const calculatedEndTime = logInTime + duration;
    setEndTime(calculatedEndTime);

    console.log(
      "End time (should be 120 mins after log_in):",
      new Date(calculatedEndTime)
    );

    setTimeout(() => {
      setStartCountdown(true);
    }, 5000);
  }, [log?.log_in, time]);

  useEffect(() => {
    if (!startCountdown || !endTime) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeLeft = endTime - now;

      console.log("Current time (now):", new Date(now));
      console.log("Time left:", timeLeft);

      if (timeLeft <= 0) {
        setCountdown("00:00:00");
        timeoutQuiz(bankid);
        return;
      }

      const hours = String(Math.floor(timeLeft / (1000 * 60 * 60))).padStart(
        2,
        "0"
      );
      const minutes = String(
        Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0");
      const seconds = String(
        Math.floor((timeLeft % (1000 * 60)) / 1000)
      ).padStart(2, "0");

      setCountdown(`${hours}:${minutes}:${seconds}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [startCountdown, endTime]);

  return (
    <div className="d-flex align-items-center justify-content-between bg-white p-1 rounded shadow border border-2">
      <div className="d-flex gap-2">
        <button style={{ width: 50 }} className="btn btn-info">
          {number}
        </button>
        <button
          style={{ width: 50 }}
          className="btn btn-warning"
          onClick={handleSync}
          disabled={isLoading}
        >
          <i className="bi bi-arrow-repeat"></i>
        </button>
      </div>
      <button className="btn btn-danger">{countdown}</button>
    </div>
  );
};

export default CbtTimer;
