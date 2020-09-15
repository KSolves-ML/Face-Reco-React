import React from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import {Photo, DeleteForever, Update, Cancel} from '@material-ui/icons';


function FileUpload(props) {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);

    const base64Images = imageList.map(function(value) {
      return value.data_url;
    });

    props.uploadImages(base64Images)
  };

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              className="button" 
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              <Photo/>
              <span>Click or Drop here</span>
            </button>
            
            <button className="button"  onClick={onImageRemoveAll}> <DeleteForever/> <span>Remove all images</span></button>
            <div className="images">
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.data_url} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}><Update/></button>
                    <button onClick={() => onImageRemove(index)}><Cancel/></button>
                  </div>
                </div>
              ))}
            </div>   
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default FileUpload;
