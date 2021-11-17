import React, { Component } from "react";
import UploadService from "../services/upload-files.service";

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      prediction:0,
      prediction2:0,
      mjsPrediction:"",
      mjsPrediction2: "",
      fileInfos: [],
    };
  }

  componentDidMount() {

  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.predictions[0].tagName,
            mjsPrediction: response.data.predictions[0].tagName,
            prediction: response.data.predictions[0].probability,
          mjsPrediction2: response.data.predictions[1].tagName,
          prediction2: response.data.predictions[1].probability,

        });
       })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Error",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      prediction,
      prediction2,
      mjsPrediction2,

    } = this.state;

    return (
      <div>
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <label className="btn btn-default">
          <input type="file" onChange={this.selectFile} />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={this.upload}
        >
          Upload
        </button>
        <div className="card mt-4">
          <div className="card-header">Resultado 1</div>
          <div className="card-body">
            <h5 className="card-title">Analisis de la planta: </h5>
            <p className="card-text">Porcentaje de roya: </p>
            <p className="card-text">{message}</p>
            <h5 className="card-title">Probabilidad: </h5>
            <p className="card-text"> % {prediction * 100}</p>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-header">Resultado 2</div>
          <div className="card-body">
            <h5 className="card-title">Analisis de la planta: </h5>
            <p className="card-text">Porcentaje de roya: </p>
            <p className="card-text">{mjsPrediction2}</p>
            <h5 className="card-title">Probabilidad: </h5>
            <p className="card-text"> % {prediction2 * 100}</p>
          </div>
        </div>
      </div>
    );
  }
}
