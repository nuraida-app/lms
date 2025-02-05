import React, { useEffect, useState } from "react";
import { useUploadFileMutation } from "../../control/api/lmsApi";
import { toast } from "react-toastify";

const LmsAddFile = ({ type, topicId, subjectCode }) => {
  const isFile = type === "file";
  const isVideo = type === "video";

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [upFile, setFile] = useState(null);

  const [uploadFile, { data, isSuccess, isLoading, error, reset }] =
    useUploadFileMutation();

  const uploadHandler = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warning("Nama harus diisi");
      return;
    }

    if (isFile && !upFile) {
      toast.warning("File harus diunggah.");
      return;
    }

    if (isVideo && !url.trim()) {
      toast.warning("URL video harus diisi.");
      return;
    }

    const payload = new FormData();
    if (isFile && upFile) {
      payload.append("file", upFile);
    } else if (isVideo && url) {
      payload.append("url", url);
    } else {
      toast.error("Mohon lengkapi semua data sebelum mengunggah.");
      return;
    }

    payload.append("title", title);
    payload.append("subject_code", subjectCode);
    payload.append("topic_id", topicId);

    uploadFile(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setTitle("");
      setUrl("");
      setFile(null);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  return (
    <div className="modal fade" id="upload" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={uploadHandler}>
          <div className="modal-header">
            <h5 className="modal-title">
              Tambah {isFile ? "File" : isVideo ? "Video" : "Konten"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column gap-2">
            <input
              type="text"
              className="form-control"
              placeholder={`Nama ${
                isFile ? "File" : isVideo ? "Video" : "Konten"
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {isFile && (
              <input
                type="file"
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            )}
            {isVideo && (
              <input
                type="text"
                className="form-control"
                placeholder="URL Video"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Tutup
            </button>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Mengunggah..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LmsAddFile;
