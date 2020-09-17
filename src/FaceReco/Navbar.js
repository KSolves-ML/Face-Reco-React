import React from 'react'
const Navbar = (props) => {
  return (
    <div className="wrapper ">
      <div id="header">
        <div id="topnav">
          <ul>
            <li className="last"><a href="" onClick={(event) => {props.addNewUserMethod(event, true)}}>Add New User</a><span>Test Text Here</span></li>
            <li className="active"><a href="#">Face Recongnize</a><span>Test Text Here</span></li>
          </ul>
        </div>
        <div className="fl_left">
          <h1><a href="" onClick={() => {props.history.push("/")}}>KSOLVES</a></h1>
          <p>FACE RECOGNITION</p>
        </div>
      </div>
      <form action="" className="steps">
        <ul id="progressbar">
          <li className="active">STEP 1</li>
          <li className="active">STEP 2</li>
          <li>STEP 3</li>
          <li>STEP 4</li>
          <li>STEP 5</li>
        </ul>
      </form>
    </div>
  )
}

export default Navbar;
