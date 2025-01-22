import React, { useEffect } from "react";
import { useGetMyLogQuery } from "../../control/api/logApi";
import { useNavigate } from "react-router-dom";

const Top = ({ name, quizName, bankid, nis }) => {
  const navigate = useNavigate();

  const { data: log } = useGetMyLogQuery(
    { nis, quiz: bankid },
    { skip: !nis || !bankid }
  );

  useEffect(() => {
    if (log?.isDone) {
      navigate(`/cbt-jawdal-ujian`);
    }
  }, [log]);
  return (
    <div className="bg-primary text-white row d-flex align-items-center p-2">
      <div className="col-lg-6 col-12">
        <p className="m-0 text-lg-start text-center">{name}</p>
      </div>
      <div className="col-lg-6 col-12">
        <p className="m-0 text-lg-end text-center">
          {quizName.replace("-", " ")}
        </p>
      </div>
    </div>
  );
};

export default Top;
