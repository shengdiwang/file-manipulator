import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EchoFile() {
  const location = useLocation();
  const navigate = useNavigate();
  // TODO: Try boolean for binary status.
  const [status, setStatus] = useState("processing");
  const [lineCount, setLineCount] = useState(0);
  const customFileName = location.state.fileName;
  const selectedFile = location.state.file;

  // Processes selected file once; tracks using 'status' state.
  // TODO: try useEffect for this.
  if (status === "processing") {
    const reader = new FileReader();

    reader.onload = function () {
      // Transposes the original file.
      const dataFragments = reader.result.split("\n");
      // TODO: Try util functions, and write unit tests.
      setLineCount(dataFragments.length);
      for (let i = 1; i < dataFragments.length; i = i + 2) {
        const temp = dataFragments[i - 1];
        dataFragments[i - 1] = dataFragments[i];
        dataFragments[i] = temp;
      }
      const transposedString = dataFragments.join("\n");

      // Creates the transposed text file for download.
      const downloadLink = document.createElement("a");
      downloadLink.className = "btn btn-primary";
      // TODO: Combine with the logic below?
      downloadLink.download = customFileName || selectedFile.name;
      downloadLink.innerHTML = `Download Transposed '${
        customFileName ? customFileName + ".txt" : selectedFile.name
      }'`;
      downloadLink.href =
        "data:text/plain;charset=utf-8," + encodeURIComponent(transposedString);
      document.getElementById("downloadTransposed").appendChild(downloadLink);

      setStatus("processed");
    };

    reader.onerror = function () {
      console.log(reader.error);
    };

    reader.readAsText(selectedFile);
  }

  // Navgiates back to UploadFile to upload another file.
  function handleUploadAnother(e) {
    e.preventDefault();

    navigate("/");
  }

  return (
    <div>
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
      <div id="downloadTransposed"></div>
      <br></br>
      <button
        id="uploadAnother"
        className="btn btn-primary"
        onClick={handleUploadAnother}
      >
        Upload Another File
      </button>
    </div>
  );
}

export default EchoFile;
