import http from "../http-common";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("https://prediction-vision.cognitiveservices.azure.com/customvision/v3.0/Prediction/0f8f9757-1149-4611-875f-33a089bca99b/classify/iterations/Iteration1/image", formData, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Prediction-Key": "f9999e2e644b4947b4a32a769afa2308"
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();
