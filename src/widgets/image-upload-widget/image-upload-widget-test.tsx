import ImageUploader, { type UploadedFile } from "./image-upload-widget";

const handleFilesUploaded = (files: UploadedFile[]) => {
  console.log("Файлы в родительском компоненте:", files);
};
const handleFileRemoved = (file: UploadedFile) => {
  console.log("Файл удален:", file.name);
};

const ImageUploadWidgetTest = () => {
  return (
    <ImageUploader
      maxFiles={3}
      onFilesUploaded={handleFilesUploaded}
      onFileRemoved={handleFileRemoved}
      accept={{
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
      }}
    />
  );
};

export default ImageUploadWidgetTest;
