import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { transposeAndCountLines } from "./Utils";

function EchoFile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [lineCount, setLineCount] = useState(0);
  const [customFileName] = useState(location.state.fileName);
  const [selectedFile] = useState(location.state.file);

  // Processes the selected file once on load.
  useEffect(() => {
    processFile(selectedFile);
  }, []);

  // Asynchronously reads and processes the selected file.
  function processFile(file) {
    const reader = new FileReader();

    reader.onload = async function () {
      const [lineCount, transposedString] = await transposeAndCountLines(
        reader.result
      );
      setLineCount(lineCount);

      // Creates the transposed text file for download.
      const downloadLink = document.getElementById("downloadTransposed");
      const downloadFileName = customFileName
        ? customFileName + ".txt"
        : file.name;
      downloadLink.download = downloadFileName;
      downloadLink.innerHTML = `Download Transposed '${downloadFileName}'`;
      downloadLink.href += encodeURIComponent(transposedString);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };

    reader.readAsText(file);
  }

  // Navgiates back to UploadFile to upload another file.
  function handleUploadAnother(e) {
    e.preventDefault();

    navigate("/");
  }

  return (
    <div className="mt-3">
      <div>
        {selectedFile ? (
          <div>
            <p>
              Original Filename: <b>{selectedFile.name}</b>
            </p>
            <p>
              Custom Filename <em>(Optional)</em>: <b>{customFileName || ""}</b>
            </p>
            <p>
              Size in bytes: <b>{selectedFile.size}</b>
            </p>
            <p>
              Count of lines in the file: <b>{lineCount}</b>
            </p>
          </div>
        ) : (
          <p>No files provided</p>
        )}
      </div>
      <a
        id="downloadTransposed"
        className="btn btn-primary mr-2"
        href="data:text/plain;charset=utf-8,"
      >
        {" "}
      </a>
      <button
        id="uploadAnother"
        className="btn btn-primary mx-2"
        onClick={handleUploadAnother}
      >
        Upload Another File
      </button>
    </div>
  );
}

export default EchoFile;
