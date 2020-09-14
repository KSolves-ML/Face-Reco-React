import React from 'react'
const Navbar = (props) => {
  return (
    <div className="wrapper col1">
      <div id="header">
        <div id="topnav">
          <ul>
            <li className="last"><a href="" onClick={() => {props.history.push("add_new_user")}}>Add New User</a><span>Test Text Here</span></li>
            <li><a href="#">DropDown</a><span>Test Text Here</span>
            </li>
            <li><a href="pages/full-width.html">User List</a><span>Test Text Here</span></li>
            <li><a href="pages/style-demo.html">Delete User</a><span>Test Text Here</span></li>
            <li className="active"><a href="#">Face Recongnize</a><span>Test Text Here</span></li>
          </ul>
        </div>
        <div className="fl_left">
          <h1><a href="" onClick={() => {props.history.push("/")}}>KSOLVES</a></h1>
          <p>FACE RECOGNITION</p>
        </div>
        <br className="clear" />
      </div>
    </div>
  )
}

export default Navbar;
