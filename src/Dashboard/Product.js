import React from 'react';
import {Visibility} from '@material-ui/icons';

import { Link } from 'react-router-dom';

const Product = (props) => {
  return (
    <>
      {
        props.title === 'Face Recognition' &&
        <Link to={props.url} style={{color: '#a4a6b2'}}>
          <div className="product">
            <img src={props.src} alt=""/>
            <div className="data">
              <h3>{props.title}</h3>
              <p>{props.description}</p>
              <a href=""><Visibility/> Preview</a>
            </div>
          </div>
        </Link>
      }
      {
        props.title !== 'Face Recognition' &&
        <a href={props.url} style={{color: '#a4a6b2'}}>
          <div className="product">
            <img src={props.src} alt=""/>
            <div className="data">
              <h3>{props.title}</h3>
              <p>{props.description}</p>
              <a href=""><Visibility/> Preview</a>
            </div>
          </div>
        </a>
      }
    </>
  )
}

export default Product;
