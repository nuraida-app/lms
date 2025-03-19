import { useState } from "react";
import Layout from "../components/Layout";
import { useGetJuzQuery } from "../../control/api/quranApi";
import TableData from "./TableData";

const TahfizAchievement = () => {
  const page = "";
  const limit = "";
  const search = "";
  const [id, setId] = useState("");

  const { data } = useGetJuzQuery({ page, limit, search });

  const handleReset = () => {
    setId(""); // Reset the juzId
  };

  return (
    <Layout title={"Capaian Siswa"}>
      <div className='row g-2'>
        <div className='col-lg-2 col-12'>
          <div className='d-flex gap-2 align-items-center'>
            <select
              name='juz'
              id='juz'
              className='form-select shadow'
              value={id}
              onChange={(e) => setId(e.target.value)}
            >
              <option value='' hidden>
                Pilih Juz
              </option>
              {data?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <button className='btn btn-secondary' onClick={handleReset}>
              <i className='bi bi-recycle'></i>
            </button>
          </div>
        </div>

        <div className='col-12'>
          <TableData juzId={id} />
        </div>
      </div>
    </Layout>
  );
};

export default TahfizAchievement;
