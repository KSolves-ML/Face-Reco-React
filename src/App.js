import React from 'react';
import './App.css';
import axios from 'axios'
import Webcam from "react-webcam";
import captureVideoFrame from "capture-video-frame";
import queryString from 'query-string';
import DotLoader from "react-spinners/DotLoader";
import Navbar from "./Navbar.js";
import { css } from '@emotion/core';
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

function App(props) {
  const webcamRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [isLoading, showLoader] = React.useState(false);
  const [name, setName] = React.useState('');


  const handleStartCaptureClick = () => {
    const frame = captureVideoFrame("my-video-id", "png");
    const img = new Image()
    img.src = frame.dataUri;
    img.onload = () => {
      const data = {
        file: frame.dataUri,
        format: frame.format,
      }

      showLoader(true)

      axios.post("https://ml-demo.ksolves.com/facerecognition",queryString.stringify(data))
      .then(function (response) {
        showLoader(false);
        const result = response.data;
        setName(result.name);
      })
      .catch(function (error) {
        showLoader(false)
      });
    }
  };


  const liveCamera = (event) => {
    event.preventDefault();
    showLoader(true)
    axios.post("https://ml-demo.ksolves.com//facerecognitionLive")
    .then(function (response) {
      showLoader(false)
    })
    .catch(function (error) {
      showLoader(false)
      console.log(error);
    });
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
      <Navbar history={props.history} />
      <div className="wrapper col2">
        <div id="featured_slide_">
          <ul id="featured_slide_Content">
            <li className="featured_slide_Image">
            {
              capturing &&
              <Webcam audio={false} ref={webcamRef} id="my-video-id" className="float-left"/>

            }
            {
              !capturing &&
              <img src={require("./images/demo/big.gif")} />
            }
              <div className="introtext">
              {
                !capturing &&
                <>
                  <div>
                    <h2><button className="button1" style={{float: 'left'}} onClick={() => {setCapturing(true)}}>Capture Image</button></h2>
                    <h2><button className="button1" style={{float: 'right'}} onClick={liveCamera}>Live Camera</button></h2>
                  </div>
                </>
              }

              {
                capturing &&
                <h2><button className="button1" onClick={handleStartCaptureClick}>Capture</button></h2>
              }

                <p style={{fontSize: '20px', fontWeight: 'bold'}}>Please try to capture image within proper brightness.</p>
              </div>
            </li>
            <li className="clear featured_slide_Image">
            </li>
          </ul>
        </div>
        {
          name && name.length > 0 && name !== 'Unknown' &&
          <h1 id="resultUser">Welcome {name} </h1>
        }

        {
          name && name.length > 0 && name === 'Unknown' &&
          <h1 id="resultUser">{name} Please Try Again </h1>
        }
      </div>
      <div className="wrapper col5">
        <div id="footer">
          <p className="fl_right">Template by <a target="_blank" href="http://www.os-templates.com/" title="Free Website Templates">OS Templates</a></p>
          <br className="clear" />
        </div>
      </div>
    </>
  );
}

export default App;
