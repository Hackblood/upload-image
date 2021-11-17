import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import UploadFiles from "./components/upload-files.component";

function App() {
  return (
    <div className="container" style={{ width: "600px" }}>
      <div style={{ margin: "20px" }}>
        <h2>Royabot</h2>
        <h5>Cargar imagen para analizar</h5>
      </div>
      <UploadFiles />
    </div>
  );
}

export default App;
