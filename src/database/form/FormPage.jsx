import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FormStudent from "./FormStudent";
import {
  useGetProvincesQuery,
  useGetStudentQuery,
} from "../../control/api/dbApi";

const FormPage = () => {
  const params = useParams();
  const { name, nis } = params;

  const [type, setType] = useState(1);
  const { data: provinces } = useGetProvincesQuery();
  const { data: student } = useGetStudentQuery(nis, { skip: !nis });

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between rounded p-2 border shadow bg-white m-2">
        <p className="m-0">{name.replace(/\-/g, " ")}</p>
      </div>

      {type === 1 && (
        <FormStudent
          provinces={provinces}
          name={name.replace(/\-/g, " ")}
          nis={nis}
          student={student}
        />
      )}
    </div>
  );
};

export default FormPage;
