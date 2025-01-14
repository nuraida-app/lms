import React, { useEffect } from "react";
import { useCreateGradeMutation } from "../../control/api/gradeApi";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";
const FormComponent = ({ detail }) => {
  const [createGrade, { data, isLoading, isSuccess, error, reset }] =
    useCreateGradeMutation();
  const [grade, setGrade] = React.useState("");

  const addHandler = (e) => {
    e.preventDefault();

    const data = { grade };

    createGrade(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setGrade("");
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, data, error]);
  return (
    <div className="d-flex flex-column gap-2 rounded p-2 shadow mt-2">
      <p className="m-0 h5">Tambahkan Data Tingkat</p>

      <form
        action=""
        className="d-flex flex-column gap-2"
        onSubmit={addHandler}
      >
        <input
          type="text"
          name="name"
          id=""
          placeholder="Tingkat"
          className="form-control"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />

        {isLoading ? (
          <BtnLoader />
        ) : (
          <button type="submit" className="btn btn-success">
            + Tambahkan
          </button>
        )}
      </form>
    </div>
  );
};

export default FormComponent;
