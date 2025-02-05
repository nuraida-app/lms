import React, { useEffect, useState } from "react";
import { useDeleteFileMutation } from "../../control/api/lmsApi";
import { toast } from "react-toastify";
import BtnLoader from "../../components/loader/BtnLoader";
import { useSelector } from "react-redux";
import Player from "./Player";

const FileCard = ({ files }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const { user } = useSelector((state) => state.auth);

  if (!files || files.length === 0) {
    return <p>Belum ada file yang diupload untuk topik ini.</p>;
  }

  const [deleteFile, { data, isSuccess, isLoading, error, reset }] =
    useDeleteFileMutation();

  const fileHandler = (file) => {
    if (file.link_file) {
      window.open(file.link_file, "_blank");
    } else {
      setName(file.title);
      setUrl(file.video);
    }
  };

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
            onClick={() => fileHandler(file)}
            data-bs-toggle={file.video ? "modal" : null}
            data-bs-target={file.video ? "#video" : null}
          >
            {file.video ? (
              <i className="bi bi-youtube"></i>
            ) : (
              <i className="bi bi-file-earmark-pdf"></i>
            )}

            {file.title}
          </button>

          {isLoading ? (
            <BtnLoader />
          ) : (
            user?.role === "teacher" && (
              <button
                className="btn btn-danger"
                onClick={() => deleteFile(file.file_id)}
              >
                Hapus
              </button>
            )
          )}
        </div>
      ))}

      <Player name={name} url={url} />
    </div>
  );
};

export default FileCard;
