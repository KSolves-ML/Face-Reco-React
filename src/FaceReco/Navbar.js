import React from 'react'
const Navbar = (props) => {
  return (
    <div className="wrapper ">
      <div id="header">
        <div id="topnav">
          <ul>
            <li className="active"><a onClick={() => {props.back()}}>Face Recongnize</a></li>
            <li className="last"><a href="" onClick={(event) => {props.addNewUserMethod(event, true)}}>Add New User</a></li>
          </ul>
        </div>
        <div className="fl_left">
          <h1><a href="#">KSOLVES</a></h1>
          <p>FACE RECOGNITION</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
