// src/ImageUploader.js

import React from "react";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import MakersImageModal from "../MakersImageModal";

interface IImageUploaderProps {
  selectedImages: Array<string | File>;
  setSelectedImages: React.Dispatch<React.SetStateAction<Array<string | File>>>;
  data?: string;
  setData?: React.Dispatch<React.SetStateAction<any[]>>;
  title?: string;
}

const Component = ({ selectedImages, setSelectedImages, data, setData, title = "메이커스 소개 이미지 추가" }: IImageUploaderProps) => {

  const handleImageChange = (event: any) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const imageUrls = Array.from(selectedFiles)?.map((file) =>
        file
      );
      console.log(imageUrls);
      setSelectedImages([...selectedImages, ...imageUrls as File[]]);
    }
  };
  const openFileDialog = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/jpeg, image/png";
    inputElement.multiple = true;
    inputElement.addEventListener("change", handleImageChange);
    inputElement.click();
  };
  return (
    <div >
      <Button
        icon="file image outline"
        content={title}
        color='grey'
        labelPosition="left"
        onClick={openFileDialog}
      />
      {(selectedImages?.length > 0) && (
        <div>
          <MakersImageModal imageSrc={selectedImages} setSelectedImages={setSelectedImages} data={data} setNowData={setData} />
        </div>
      )}
    </div>
  );
};

export default Component;
