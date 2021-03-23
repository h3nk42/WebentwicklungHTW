import React, { useRef, useState } from "react";
import "./cropper.css";
import PropTypes from "prop-types";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import getCroppedImg, { generateDownload } from "../../utils/cropImage";
import { dataURLtoFile } from "../../utils/dataURLtoFile";

export default function RenderCropper({ handleCropper }) {
  const inputRef = useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const onUpload = async () => {
    const canvas = await getCroppedImg(image, croppedArea);
    const canvasDataUrl = canvas.toDataURL("image/jpeg");
    const convertedUrlToFile = dataURLtoFile(
      canvasDataUrl,
      "cropped-image.jpeg"
    );

    try {
      const formData = new FormData();
      formData.append("croppedImage", convertedUrlToFile);

      const res = await fetch("http://localhost:9000/api/users/setProfilePic", {
        method: "POST",
        body: formData,
      });

      const res2 = await res.json();
      console.log(res2);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrapper">
      <div className="close" onClick={handleCropper} />
      <div className="wrapper-cropper">
        {image && (
          <>
            <div className="cropper">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="slider">
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
          </>
        )}
      </div>
      <div className="container-buttons">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={onSelectFile}
        />
        <button 
            className="btn btn-outline-primary btn-sm mr-2"
            onClick={() => setImage(null)}
            style={{ marginRight: "10px" }}
        >
            Clear
        </button>
        <button 
            className="btn btn-outline-primary btn-sm mr-2"
            onClick={triggerFileSelectPopup}
            style={{ marginRight: "10px" }}
        >
            Choose
        </button>
        <button
            className="btn btn-primary btn-sm m-2 px-3"
            onClick={() => generateDownload(image, croppedArea)}
            style={{ marginRight: "10px" }}
            disabled={!image}
        >
            Download
        </button>
        <button
            className="btn btn-primary btn-sm m-2 px-3"
            onClick={onUpload}
            disabled={!image}
        >
            Upload
        </button>
      </div>
    </div>
  );
}

RenderCropper.propTypes = {
  handleCropper: PropTypes.func,
};
