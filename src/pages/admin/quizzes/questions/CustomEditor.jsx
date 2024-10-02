import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";
import { Box } from "@mui/material";

const CustomEditor = ({ placeholder, value, onChange }) => {
  const editorRef = useRef(null);

  const handleEditorChange = (content) => {
    onChange(content);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(value || "");
    }
  }, [value]);

  return (
    <Box sx={{ height: 450, bgcolor: "white" }}>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        init={{
          height: 450,
          placeholder: placeholder,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | image | media " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          images_upload_url: `${import.meta.env.VITE_BASE}/upload/images`,
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "audio/*");
            input.onchange = function () {
              var file = this.files[0];
              var reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = function () {
                var formData = new FormData();
                formData.append("file", file);

                fetch(`${import.meta.env.VITE_BASE}/upload/audios`, {
                  method: "POST",
                  body: formData,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    cb(data.url, { title: file.name });
                  })
                  .catch((error) => {
                    console.error("Error uploading image:", error);
                    alert("Error uploading image");
                  });
              };
            };
            input.click();
          },
        }}
        onEditorChange={handleEditorChange}
      />
    </Box>
  );
};

CustomEditor.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CustomEditor;
