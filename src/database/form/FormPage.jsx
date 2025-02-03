import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FormStudent from "./FormStudent";
import {
  useGetProvincesQuery,
  useGetStudentQuery,
} from "../../control/api/dbApi";
import FormParents from "./FormParents";
import FormFamily from "./FormFamily";

const FormPage = () => {
  const params = useParams();
  const { name, nis } = params;

  const [type, setType] = useState(1);
  const { data: provinces } = useGetProvincesQuery();
  const { data: student } = useGetStudentQuery(nis, { skip: !nis });

  return (
    <div>
      <div className="row rounded p-2 border shadow bg-white m-2 g-1">
        <div className="col-md-6 col-12 d-flex align-items-center">
          <p className="m-0 h5">{name.replace(/\-/g, " ")}</p>
        </div>
        <div className="col-md-6 col-12">
          <select
            name="type"
            id="122"
            className="form-select"
            value={type || ""}
            onChange={(e) => setType(e.target.value)}
          >
            <option value={1}>Data Siswa</option>
            <option value={2}>Data Orang tua</option>
            <option value={3}>Data Keluarga</option>
          </select>
        </div>
      </div>

      <div className="container-fluid">
        {type == 1 && (
          <FormStudent
            provinces={provinces}
            name={name.replace(/\-/g, " ")}
            nis={nis}
            student={student}
          />
        )}

        {type == 2 && <FormParents student={student} />}

        {type == 3 && <FormFamily student={student} />}
      </div>
    </div>
  );
};

export default FormPage;
