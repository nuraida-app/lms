import { useEffect, useState } from "react";
import { useGetJuzQuery } from "../../control/api/quranApi";
import {
  useAddTargetMutation,
  useGetGradesQuery,
} from "../../control/api/scoreApi";
import { toast } from "react-toastify";

const Form = () => {
  const page = "";
  const limit = "";
  const search = "";

  const [gradeid, setGradeid] = useState("");
  const [juzid, setJuzid] = useState("");

  const { data: grades } = useGetGradesQuery();
  const { data: juz } = useGetJuzQuery({ page, limit, search });
  const [addTarget, { data, isLoading, isSuccess, error, reset }] =
    useAddTargetMutation();

  const addHandler = (e) => {
    e.preventDefault();

    const data = { gradeid, juzid };

    addTarget(data);
  };

  const cancel = () => {
    setGradeid("");
    setJuzid("");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();

      setGradeid("");
      setJuzid("");
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, error, data]);

  return (
    <form
      onSubmit={addHandler}
      className='rounded border border-2 bg-white p-2 d-flex flex-column gap-2 shadow mt-2'
    >
      <p className='m-0 h6'>Target Hafalan</p>
      <select
        className='form-select'
        value={gradeid}
        onChange={(e) => setGradeid(e.target.value)}
      >
        <option value='' hidden>
          Pilih Tingkat
        </option>
        {grades?.map((grade) => (
          <option key={grade.id} value={grade.id}>
            {grade.grade}
          </option>
        ))}
      </select>

      <select
        className='form-select'
        value={juzid}
        onChange={(e) => setJuzid(e.target.value)}
      >
        <option value='' hidden>
          Pilih Juz
        </option>
        {juz?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <div className='d-flex justify-content-end gap-2'>
        <button type='button' className='btn btn-warning' onClick={cancel}>
          Batal
        </button>
        <button type='submit' className='btn btn-success' disabled={isLoading}>
          + Tambahkan
        </button>
      </div>
    </form>
  );
};

export default Form;
