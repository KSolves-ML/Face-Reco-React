import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Webcam from "react-webcam";
import captureVideoFrame from "capture-video-frame";
import queryString from 'query-string';
import DotLoader from "react-spinners/DotLoader";
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

function App() {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [capturing, setCapturing] = React.useState(false);
  const [isLoading, showLoader] = React.useState(false);
  const [name, setName] = React.useState('');


  const handleStartCaptureClick = React.useCallback(() => {
    let boxes = [];
    const frame = captureVideoFrame("my-video-id", "png");
    // const newimg = document.getElementById('img');
    // newimg.setAttribute("src", frame.dataUri);
    const img = new Image()
    img.src = frame.dataUri;
    img.onload = () => {
      const data = {
        file: frame.dataUri,
        format: frame.format,
      }
      debugger
      showLoader(true)

      axios.post("https://79c359782a60.ngrok.io/facerecognition",queryString.stringify(data))
      .then(function (response) {
        showLoader(false);
        debugger
        const result = response.data;
        setName(result.name)

          // const start = boxes[0][0];
          // const end = boxes[0][2];

          // boxes = boxesPoints.points;
          // context.drawImage(img, 10, 50, canvas.width, canvas.height)
          // context.beginPath();
          // context.lineWidth = "4";
          // context.strokeStyle = "green";
          // context.rect(boxes[0][0], boxes[0][1], boxes[0][2]-boxes[0][0], boxes[0][3]-boxes[0][1]);
          // context.fillStyle = 'green';
          // context.fillRect(boxes[0][0], boxes[0][1], boxes[0][2]-boxes[0][0], (boxes[0][3]-boxes[0][1])/3);
          // context.fillStyle = "red";
          // context.font = "16pt serif";
          // context.fillText(boxes.name, , 20);
          // context.stroke();
      })
      .catch(function (error) {
        debugger
        showLoader(false)
      });

    }

      // Upload the image...
      // const formData = new FormData();
      // formData.append("file", frame.dataUri, `my-screenshot.${frame.format}`);

  }, [webcamRef, setCapturing, mediaRecorderRef]);


  const submit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/facerecognitionLive")
    .then(function (response) {
      showLoader(false)
      debugger
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
      <div className="wrapper col1">
        <div id="header">
          <div id="topnav">
            <ul>
              <li className="last"><a href="pages/gallery.html">Add New User</a><span>Test Text Here</span></li>
              <li><a href="#">DropDown</a><span>Test Text Here</span>
                <ul>
                  <li><a href="#">Link 1</a></li>
                  <li><a href="#">Link 2</a></li>
                  <li><a href="#">Link 3</a></li>
                </ul>
              </li>
              <li><a href="pages/full-width.html">User List</a><span>Test Text Here</span></li>
              <li><a href="pages/style-demo.html">Delete User</a><span>Test Text Here</span></li>
              <li className="active"><a href="#">Face Recongnize</a><span>Test Text Here</span></li>
            </ul>
          </div>
          <div className="fl_left">
            <h1><a href="index.html">KSOLVES</a></h1>
            <p>FACE RECOGNITION</p>
          </div>
          <br className="clear" />
        </div>
      </div>

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
                <h2><button className="button1" onClick={() => {setCapturing(true)}}>Start Face Recognition</button></h2>
              }

              {
                capturing &&
                <h2><button className="button1" onClick={handleStartCaptureClick}>Capture</button></h2>
              }

                <p>Please try to camputure image within proper brightness.</p>
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
          <p className="fl_left">Copyright &copy; 2014 - All Rights Reserved - <a href="#">Domain Name</a></p>
          <p className="fl_right">Template by <a target="_blank" href="http://www.os-templates.com/" title="Free Website Templates">OS Templates</a></p>
          <br className="clear" />
        </div>
      </div>
    </>
  );
}

export default App;
