import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { validateFileName } from "./Utils";

function UploadFile() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isSubmitFailed, setIsSubmitFailed] = useState(false);
  const [isFileNameInvalid, setIsFileNameInvalid] = useState(false);
  const navigate = useNavigate();
  // Allows a 1 file per upload.
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "text/html": [".txt"],
      },
      maxFiles: 1,
      onDrop,
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>Accepted item: {file.path}</li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <li key={file.path}>
        Rejected item: {file.path}
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    );
  });

  function onDrop(acceptedFiles) {
    // Checks if at least 1 file is selected.
    if (acceptedFiles.length !== 0) {
      setSelectedFile(acceptedFiles[0]);
      setIsFileSelected(true);
      setIsSubmitFailed(false);
      setIsFileNameInvalid(false);
    } else {
      setIsFileSelected(false);
      setIsSubmitFailed(false);
      setIsFileNameInvalid(false);
    }
  }

  function handleSubmission(e) {
    e.preventDefault();

    // Checks if at least 1 file is selected.
    if (isFileSelected) {
      let customFileName = document.getElementById("fileName").value;
      if (validateFileName(customFileName)) {
        navigate("/echo", {
          state: {
            fileName: customFileName,
            file: selectedFile,
          },
        });
      } else {
        setIsFileNameInvalid(true);
      }
    } else {
      setIsSubmitFailed(true);
    }
  }

  return (
    <div className="mt-3">
      <section>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p className="my-5">
            Drag and drop a text file here, or click to select one
            <br />
            <em>(Only one *.txt file will be accepted)</em>
          </p>
        </div>
        <aside className="dropzone-aside-accepted">
          {acceptedFiles ? <ul>{acceptedFileItems}</ul> : null}
        </aside>
        <aside className="dropzone-aside-rejected">
          {fileRejections ? <ul>{fileRejectionItems}</ul> : null}
        </aside>
      </section>
      <label htmlFor="fileName">
        Provide a custom file name <em>(Optional)</em>:&nbsp;{" "}
      </label>
      <input id="fileName" name="fileName" type="text"></input>
      <div className="mt-2">
        {isSubmitFailed ? (
          <div id="error-msg">Requires at least one file to be selected</div>
        ) : null}
        {isFileNameInvalid ? (
          <div id="error-msg">Requires a valid file name or empty name</div>
        ) : null}
        <button
          id="submitFile"
          className="btn btn-primary"
          onClick={handleSubmission}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default UploadFile;
