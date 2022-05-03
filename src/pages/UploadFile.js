import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

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

  // TODO: Wrap into React memo hook to reduce computation.
  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>Accepted item: {file.path}</li>
  ));

  // TODO: Wrap into React memo hook to reduce computation.
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

  // TODO: Consider adding ErrorBoundary to submit and uploadfile.
  function handleSubmission(e) {
    e.preventDefault();

    // Checks if at least 1 file is selected.
    if (isFileSelected) {
      let customFileName = document.getElementById("fileName").value;
      // Valids custom file name provided.
      // TODO: Refactor the logic into a new function, with explicit name such as validateFileName().
      if (customFileName === "" || /^[a-zA-Z0-9-_]+$/.test(customFileName)) {
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
    <div>
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>
            <br />
            <br />
            Drag and drop a text file here, or click to select one
            <br />
            <em>(Only one *.txt file will be accepted)</em>
            <br />
            <br />
          </p>
        </div>
        <aside className="dropzone-aside-accepted">
          {acceptedFiles ? <ul>{acceptedFileItems}</ul> : null}
        </aside>
        <aside className="dropzone-aside-rejected">
          {fileRejections ? <ul>{fileRejectionItems}</ul> : null}
        </aside>
      </section>
      <br />
      <label htmlFor="fileName">
        Provide a custom file name <em>(Optional)</em>:{" "}
      </label>
      <input id="fileName" name="fileName" type="text"></input>
      <br />
      <br />
      <div>
        {isSubmitFailed ? (
          <div id="error-msg">Requires at least one file to be selected</div>
        ) : null}
        {isFileNameInvalid ? (
          <div id="error-msg">
            Requires file names to contain only &lsquo;-&rsquo;,
            &lsquo;_&rsquo;, and alphanumerics
          </div>
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
