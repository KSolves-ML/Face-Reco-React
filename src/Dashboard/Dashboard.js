import React, { Component } from 'react'
import {Visibility} from '@material-ui/icons';
export class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="container">
          <aside>
            <div className="logo">
              <h3>KSOLVES</h3>
            </div>
            <ul>
              <li><a href="">Natural language processing</a></li>
              <li className="active"><a href="">Computer vision </a>
                <ul>
                  <li className="active"><a href="">Face Recognigation</a></li>
                  <li><a href="">Face Recognigation</a></li>
                  <li><a href="">Face Recognigation</a></li>
                  <li><a href="">Face Recognigation</a></li>
                </ul>
              </li>
              <li><a href="">Traditional machine learning </a></li>
              <li><a href="">Recommendation  system </a></li>
            </ul>
          </aside>
          <section>
            <h2 className="heading">Products</h2>
            <p className="subHeading">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="products">
              <div className="product">
                <img src="https://miro.medium.com/max/660/1*enzZrRQ_EwtfJJKOffrcFg.png" alt=""/>
                <div className="data">
                  <h3>Face Recognigation App</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio excepturi, illo dignissimos mollitia odio fugiat amet</p>
                  <a href=""><Visibility/> Preview</a>
                </div>
              </div>
              <div className="product">
                <img src="https://miro.medium.com/max/660/1*enzZrRQ_EwtfJJKOffrcFg.png" alt=""/>
                <div className="data">
                  <h3>Face Recognigation App</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio excepturi, illo dignissimos mollitia odio fugiat amet</p>
                  <a href=""><Visibility/> Preview</a>
                </div>
              </div>
              <div className="product">
                <img src="https://miro.medium.com/max/660/1*enzZrRQ_EwtfJJKOffrcFg.png" alt=""/>
                <div className="data">
                  <h3>Face Recognigation App</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio excepturi, illo dignissimos mollitia odio fugiat amet</p>
                  <a href=""><Visibility/> Preview</a>
                </div>
              </div>
              <div className="product">
                <img src="https://miro.medium.com/max/660/1*enzZrRQ_EwtfJJKOffrcFg.png" alt=""/>
                <div className="data">
                  <h3>Face Recognigation App</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio excepturi, illo dignissimos mollitia odio fugiat amet</p>
                  <a href=""><Visibility/> Preview</a>

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default Dashboard
