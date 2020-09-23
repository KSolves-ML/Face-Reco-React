import React from 'react';
import axios from 'axios';
import Webcam from "react-webcam";
import captureVideoFrame from "capture-video-frame";
import queryString from 'query-string';
import DotLoader from "react-spinners/DotLoader";
import { css } from '@emotion/core';
import {AddPhotoAlternate, Compare} from '@material-ui/icons';
import FileUpload from "./FileUpload";
import { ToastContainer, toast } from 'react-toastify';
import NotificationSystem from 'react-notification-system';

import 'react-toastify/dist/ReactToastify.css';
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
  const notificationSystem = React.useRef(null);

  const style = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      margin: '10px 5px 2px 1px'
    },

    success: { // Applied only to the success notification item
      color: 'red'
    }
  }
}
  const addNewImage = () => {
    if (images.length === 4) {
      addImage([]);
    }

    const frame = captureVideoFrame("my-video-id", "png");

    const newImage = [...images];

    newImage.push(frame.dataUri);
    addImage(newImage);
    const imageNo = images.length+1

    if (imageNo <= 4) {
      const img = document.getElementById("addImage"+imageNo)
      img.src = frame.dataUri;
      let imgCount = '';

      if (imageNo === 1) {
        imgCount = 'One';
      } else if (imageNo === 2) {
        imgCount = 'Two';
      } else if (imageNo === 3) {
        imgCount = 'Three';
      } else if (imageNo === 4) {
        imgCount = 'Four';
      }
      const notification = notificationSystem.current;
      notification.addNotification({
        message: imgCount === 'One' ? imgCount + " Image Added" : imgCount +" Images Added",
        level: 'info'
      });
    }
  }

  const allignImages = () => {
    if(images.length === 4 && newUserName.length !== 0) {
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
        const notification = notificationSystem.current;

        notification.addNotification({
          message: "New user added successfully.",
          level: 'info'
        });

        for (let i=1; i<=4; i++) {
          const img = document.getElementById("addImage"+i)
          img.src = require("../images/demo/big.gif");
        }
        setUserName("");
        addImage([]);
        showLoader(false);
      })
      .catch(function (error) {
        const notification = notificationSystem.current;

        notification.addNotification({
          message: "Something went wrong",
          level: 'info'
        });
        showLoader(false)
      });
    } else {
      let error = '';

      if (images.length < 4) {
        error = "Please add four user images.";
        const notification = notificationSystem.current;

        notification.addNotification({
          message: error,
          level: 'info'
        });
      }

      if (newUserName.length === 0) {
        const error = "Please enter the username.";
        const notification = notificationSystem.current;

        notification.addNotification({
          message: error,
          level: 'info'
        });
      }
    }
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
    <NotificationSystem ref={notificationSystem}  style={style}/>
    <DotLoader
         css={override}
         sizeUnit={"px"}
         size={150}
         loading={isLoading}
         color={'yellow'}
       />
      <div className="wrapper">
        <div className="white-bg">
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
            <div className="button-group-inner">
              <button className="btn purple-gradient" onClick={addNewImage}><AddPhotoAlternate/> <span>Add Image</span></button>
              <button className="btn purple-gradient" onClick={allignImages}><Compare/> <span>Start Training</span></button>
            </div>
            <FileUpload uploadImages={uploadImages} />
          </div>

        </div>
      </div>
    </>
  );
}

export default AddNewUser;
