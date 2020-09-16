import React from 'react';
import axios from 'axios';
import Webcam from "react-webcam";
import captureVideoFrame from "capture-video-frame";
import queryString from 'query-string';
import DotLoader from "react-spinners/DotLoader";
import { css } from '@emotion/core';
import {AddPhotoAlternate, Compare} from '@material-ui/icons';
import FileUpload from "./FileUpload"
const override = css`
display: block;
margin: 0 auto;
border-color: red;
z-index: 100;
position: absolute;
top: 50vh;
left: 50vw;
font-size: 100px;
color: yellow;
transform: translate(-50%,-50%);
`;

const AddNewUser = (props) => {
  const webcamRef = React.useRef(null);
  const [isLoading, showLoader] = React.useState(false);
  const [images, addImage] = React.useState([]);
  const [newUserName, setUserName] = React.useState('');

  const addNewImage = () => {
    if (images.length === 4) {
      addImage([]);
    }

    const frame = captureVideoFrame("my-video-id", "png");

    const newImage = [...images];

    newImage.push(frame.dataUri);
    addImage(newImage);
    const imageNo = images.length+1
    const img = document.getElementById("addImage"+imageNo)
    img.src = frame.dataUri
  }

  const allignImages = () => {
      const data = {
        file1: images[0],
        file2: images[1],
        file3: images[2],
        file4: images[3],
        userName: newUserName,
      }
      showLoader(true);

      axios.post("https://ml-demo.ksolves.com:5000/align_images",queryString.stringify(data))
      .then(function (response) {
        showLoader(false);
      })
      .catch(function (error) {

        showLoader(false)
      });
  }


  const createEmbeddings = () => {
      showLoader(true);

      axios.post("https://ml-demo.ksolves.com:5000/create_embeddings")
      .then(function (response) {
        showLoader(false);
      })
      .catch(function (error) {

        showLoader(false)
      });
  }

  const uploadImages = (imageList) => {
    imageList.forEach((item, i) => {
      const imageNo = i+1;
      const img = document.getElementById("addImage"+imageNo)
      img.src = item
    });

    addImage(imageList);
  }

  return (
    <>
    <DotLoader
         css={override}
         sizeUnit={"px"}
         size={150}
         loading={isLoading}
         color={'yellow'}
       />
      <div id="container">
        <div className="dark-bg">
          <div className="left-frame">
            <Webcam audio={false} ref={webcamRef} id="my-video-id" className="testImage"/>
            <div className="cam-footer">
              <div className="imageList">
                <img src={require("../images/demo/big.gif")} alt="" className="addImage" id="addImage1"/>
                <img src={require("../images/demo/big.gif")} className="addImage" alt="" id="addImage2"/>
                <img src={require("../images/demo/big.gif")} className="addImage"alt="" id="addImage3"/>
                <img src={require("../images/demo/big.gif")}className="addImage" alt="" id="addImage4"/>
              </div>
              <div className="input-outer">
                <input type="text" value={newUserName} placeholder="Add text here" id="userName" onChange={(event) => {setUserName(event.target.value)}} />
              </div>
            </div>
          </div>
          <div className="button-group">
            <div>
              <button className="button" onClick={addNewImage}><AddPhotoAlternate/> <span>Add Image</span></button>
              <button className="button" onClick={allignImages}><Compare/> <span>Start Training</span></button>
            </div>
            <FileUpload uploadImages={uploadImages} />
          </div>

        </div>
      </div>
    </>
  );
}

export default AddNewUser;
