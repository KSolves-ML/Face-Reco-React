import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Webcam from "react-webcam";
import captureVideoFrame from "capture-video-frame";
import queryString from 'query-string';
import DotLoader from "react-spinners/DotLoader";
import { css } from '@emotion/core';
import ImageUploader from 'react-images-upload';
import Navbar from "./Navbar.js";
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
    debugger
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
      debugger
      showLoader(true);

      axios.post("https://ml-demo.ksolves.com/align_images",queryString.stringify(data))
      .then(function (response) {
        showLoader(false);
      })
      .catch(function (error) {

        showLoader(false)
      });
  }


  const createEmbeddings = () => {
      showLoader(true);

      axios.post("https://ml-demo.ksolves.com//create_embeddings")
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
    <FileUpload />
    <DotLoader
         css={override}
         sizeUnit={"px"}
         size={150}
         loading={isLoading}
         color={'yellow'}
       />
      <Navbar history={props.history} />
      <div>
        <div>
          <ul>
            <li>
              <center>
                <Webcam audio={false} ref={webcamRef} id="my-video-id" className="webcame-2"/>
                <div className="imageList">
                  <img src={require("./images/demo/big.gif")} alt="" className="addImage" id="addImage1"/>
                  <img src={require("./images/demo/big.gif")} className="addImage" alt="" id="addImage2"/>
                  <img src={require("./images/demo/big.gif")} className="addImage"alt="" id="addImage3"/>
                  <img src={require("./images/demo/big.gif")}className="addImage" alt="" id="addImage4"/>
                </div>
                <div className="clear-both">
                  <input type="text" value={newUserName} id="userName" onChange={(event) => {setUserName(event.target.value)}} />
                </div>
                <div>
                  <h2><button className="button" onClick={addNewImage}>Add Image</button></h2>
                  <h2><button className="button" onClick={allignImages}>Start Training</button></h2>
                  <FileUpload uploadImages={uploadImages} />
                </div>
              </center>
            </li>
            <li className="clear featured_slide_Image">
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AddNewUser;
