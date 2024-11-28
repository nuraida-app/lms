import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";
import { Box } from "@mui/material";

const CustomEditor = ({ placeholder, value, onChange }) => {
  const editorRef = useRef(null);

  const handleEditorChange = (content) => {
    onChange(content);
  };

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

// import React, { useRef, useEffect, useState } from "react";
// import ReactQuill, { Quill } from "react-quill";
// import PropTypes from "prop-types";
// import { Box } from "@mui/material";
// import ImageUploader from "quill-image-uploader";
// import "react-quill/dist/quill.snow.css";

// // Register quill-image-uploader module
// Quill.register("modules/imageUploader", ImageUploader);

// const CustomEditor = ({ placeholder, value = "", onChange }) => {
//   const quillRef = useRef(null);

//   const handleEditorChange = (content) => {
//     onChange(content);
//   };

//   console.log(value);

//   const handleAudioUpload = () => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "audio/*");
//     input.onchange = async () => {
//       const file = input.files[0];
//       const formData = new FormData();
//       formData.append("file", file);

//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_BASE}/upload/audios`,
//           {
//             method: "POST",
//             body: formData,
//           }
//         );
//         const data = await response.json();
//         const editor = quillRef.current.getEditor();
//         const range = editor.getSelection();
//         editor.insertEmbed(range.index, "link", data.url); // Insert uploaded file as link
//       } catch (error) {
//         console.error("Error uploading file:", error);
//         alert("Error uploading file");
//       }
//     };
//     input.click();
//   };

//   const modules = {
//     toolbar: {
//       container: [
//         ["bold", "italic", "underline", "strike"],
//         [{ list: "ordered" }, { list: "bullet" }],
//         ["link", "image", "audio"], // Add audio button
//         ["clean"],
//       ],
//       handlers: {
//         audio: handleAudioUpload, // Custom handler for audio upload
//       },
//     },
//     imageUploader: {
//       upload: (file) => {
//         return new Promise((resolve, reject) => {
//           const formData = new FormData();
//           formData.append("file", file);

//           fetch(`${import.meta.env.VITE_BASE}/upload/images`, {
//             method: "POST",
//             body: formData,
//           })
//             .then((response) => response.json())
//             .then((result) => {
//               resolve(result.location); // Resolve the URL for the uploaded image
//             })
//             .catch((error) => {
//               reject("Upload failed");
//               console.error("Error:", error);
//               alert("Error uploading image");
//             });
//         });
//       },
//     },
//   };

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "list",
//     "bullet",
//     "link",
//     "image",
//   ];

//   return (
//     <Box sx={{ maxHeight: 450, bgcolor: "white", overflow: "auto" }}>
//       <ReactQuill
//         ref={quillRef}
//         theme="snow"
//         value={value}
//         onChange={handleEditorChange}
//         placeholder={placeholder}
//         modules={modules}
//         formats={formats}
//         style={{ maxHeight: "450px" }}
//       />
//     </Box>
//   );
// };

// CustomEditor.propTypes = {
//   placeholder: PropTypes.string,
//   value: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
// };

// export default CustomEditor;
