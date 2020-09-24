import React,{ useState } from 'react';
import {Menu,Close} from '@material-ui/icons';

const Navbar = (props) => {

  const [ isOpen, setIsOpen] = useState(false);

  const changeMenuState = () => {
    setIsOpen(!isOpen?true:false )
  }
  return (
    <div  id="header">
      <div className="wrapper">
        <div className="logo">
          <div className="logo-inner">
            <img className="facereco-logo" src={require("../images0/ksolvesLogo.png")} />
            <p>FACE RECOGNITION</p>
          </div>
          <div className="menu-trigger">
            <button className={isOpen?'isOpen':'isClose'}  onClick={changeMenuState}>
              <div className="close-ic">
                <Close/>
              </div>
              <div className="open-ic">
                <Menu/>
              </div>
            </button>
          </div>
        </div>
        <div id="topnav" className={isOpen?'collapsed':''}>
          <ul>
            <li className="active"><a onClick={() => {props.back()}}>Face Recongnize</a></li>
            <li className="last"><a href="" onClick={(event) => {props.addNewUserMethod(event, true)}}>Add New User</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
