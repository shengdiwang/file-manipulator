import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadFile from "./pages/UploadFile";
import EchoFile from "./pages/EchoFile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Supports uploading the original file. */}
        <Route path="/" element={<UploadFile />} />
        {/* Echoes uploaded file and supports downloading transposed file. */}
        <Route path="/echo" element={<EchoFile />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
