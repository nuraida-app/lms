import React, { useState, useEffect } from "react";
import { useTimeoutQuizMutation } from "../../control/api/logApi";
import { toast } from "react-toastify";

const CbtTimer = ({ refresh, isLoading, number, time, log, bankid }) => {
  const [countdown, setCountdown] = useState("00:00:00");

  const [timeoutQuiz, { isSuccess, error }] = useTimeoutQuizMutation();

  const handleSync = () => {
    localStorage.removeItem("questions");
    refresh();
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.href = `/cbt-jawdal-ujian`;
      localStorage.removeItem("questions");
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (!log?.log_in) return;

    const logInTime = new Date(log.log_in).getTime();
    const endTime = logInTime + time * 60 * 1000; // 60 menit dalam milidetik

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeLeft = endTime - now;

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

    updateCountdown(); // Initialize countdown immediately
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [log?.log_in, time]);

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
