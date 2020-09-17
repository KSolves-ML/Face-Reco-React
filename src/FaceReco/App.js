import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Webcam from "react-webcam";
import captureVideoFrame from "capture-video-frame";
import queryString from 'query-string';
import AddNewUser from "./AddNewUser";
import DotLoader from "react-spinners/DotLoader";
import NotificationSystem from 'react-notification-system';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar.js";
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';


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
  const [newUser, addNewUser] = React.useState(false);
  const notificationSystem = React.useRef(null);
  const style = {
    NotificationItem: { // Override the notification item
      DefaultStyle: { // Applied to every notification, regardless of the notification level
        margin: '10px 5px 2px 1px',
        height:'50px'
      },

      success: { // Applied only to the success notification item
        color: 'blue'
      }
    }
  }

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

      axios.post("https://ml-demo.ksolves.com:5000/facerecognition",queryString.stringify(data))
      .then(function (response) {
        showLoader(false);
        const result = response.data;
        const notification = notificationSystem.current;

        notification.addNotification({
        message: result.name,
        level: 'success'
      });
        setName(result.name);
      })
      .catch(function (error) {
        showLoader(false)
      });
    }
  };

  const addNewUserMethod = (event, value) => {
    event.preventDefault()
    addNewUser(value);
    setCapturing(false);
  }

  useEffect(() => {
  // Update the document title using the browser API
    const script = document.createElement("script");

    script.src = "layout/scripts/slider.js";
    script.async = true;

    document.body.appendChild(script);
  });

  const back = () => {
    setCapturing(true);
    addNewUser(false);

  }

  return (
    <>
    <NotificationSystem ref={notificationSystem}  style={style}/>
    <Navbar history={props.history}  addNewUserMethod={addNewUserMethod} back={back}/>
    {
      capturing && !newUser &&
      <form action="" className="steps">
        <ul id="progressbar">
          <li className="active">Align Face On Camera</li>
          <li className="active">Click On Capture Button</li>
        </ul>
      </form>
    }

    {
      newUser && !capturing &&
      <form action="" className="steps">
        <ul id="progressbar">
          <li className="active">Add new user name in the input box.</li>
          <li className="active">Align your face on camera</li>
          <li className="active">Capture four images of new user</li>
          <li className="active">Click on start training button</li>
        </ul>
      </form>
    }

    { !newUser &&
      <>
        <DotLoader
             css={override}
             sizeUnit={"px"}
             size={150}
             loading={isLoading}
             color={'yellow'}
           />
          <div className="wrapper col2">
            <div className="dark-bg" id="featured_slide_">
              <ul id="featured_slide_Content">
                <li className="featured_slide_Image">
                {
                  capturing &&
                  <Webcam audio={false} ref={webcamRef} id="my-video-id" className="float-left"/>

                }
                {
                  !capturing &&
                  <img src={require("../images/demo/big.gif")} />
                }
                  <div className="introtext">
                  {
                    !capturing &&
                    <>
                      <div>
                        <Link to="/"><button className="button1" style={{float: 'left', width: '100px', paddingLeft: '30px'}}>Back</button></Link>
                        <button className="button1" style={{float: 'right', width: '100px', paddingLeft: '30px'}} onClick={() => {setCapturing(true)}}>Next</button>
                      </div>
                    </>
                  }

                  {
                    capturing &&
                    <>
                      <Link to="/"><button className="button1" style={{float: 'left', width: '100px', paddingLeft: '30px'}}>Back</button></Link>
                      <button className="button1" onClick={handleStartCaptureClick} style={{float: 'right', width: '100px', paddingLeft: '30px'}}>Capture</button>
                    </>
                  }
                  {
                    !capturing &&
                    <p style={{fontSize: '20px', fontWeight: 'bold'}}>Please try to capture image within proper brightness.</p>
                  }
                  {
                    capturing &&
                    <p style={{fontSize: '20px', fontWeight: 'bold'}}>FACE RECOGNITION</p>
                  }

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
          </>
        }
      {
        newUser &&
        <AddNewUser />
      }
    </>
  );
}

export default App;
