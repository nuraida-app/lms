import React, { useEffect } from "react";
import { useDeleteFileMutation } from "../../control/api/lmsApi";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";

const FileCard = ({ files, fileHandler }) => {
  if (!files || files.length === 0) {
    return <p>Belum ada file yang diupload untuk topik ini.</p>;
  }

  const [deleteFile, { data, isSuccess, isLoading, error, reset }] =
    useDeleteFileMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  return (
    <div>
      {files.map((file) => (
        <div
          key={file.file_id}
          className="mb-2 d-flex justify-content-between p-1 rounded border border-2"
        >
          <button
            className={`btn btn-primary d-flex gap-2`}
            onClick={() => fileHandler(file.link_file || file.video)}
          >
            <i className="bi bi-youtube"></i>
            {file.title}
          </button>

          {isLoading ? (
            <BtnLoader />
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => deleteFile(file.file_id)}
            >
              Hapus
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileCard;
