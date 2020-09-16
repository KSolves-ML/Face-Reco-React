import React, { Component } from 'react'
import Product from './Product';

export class Dashboard extends Component {
  constructor() {
    super ()
    this.state  = {
      selectedMenu: 'all'
    }
  }

  changeSection = (section) => {
    this.setState({
      selectedMenu: section
    })
  }

  render() {
    return (
      <div className="dashboard">
        <div className="container">
          <aside>
            <div className="logo">
              <h3>KSOLVES</h3>
            </div>
            <ul>
              <li><a onClick={() => {this.changeSection('all')}}>Machine Learning App</a></li>
              <li><a onClick={() => {this.changeSection('nlp')}}>Natural language processing</a></li>
              <li className="active"><a onClick={() => {this.changeSection('computerVision')}}>Computer vision </a>
              </li>
              <li><a href="">Traditional machine learning </a></li>
              <li><a href="">Recommendation  system </a></li>
            </ul>
          </aside>

          {
            this.state.selectedMenu === 'all' &&
            <section>

              <h2 className="heading">Machine Learning Apps</h2>
               <p className="subHeading">Considering the newness and complexity of the technology, integrating AI & Machine learning solutions into a business’s current IT stack can seem like a tough task. That’s where Ksolves comes in.</p>
              <div className="products">
                <Product
                src="https://miro.medium.com/max/660/1*enzZrRQ_EwtfJJKOffrcFg.png"
                title="Face Recognition"
                description="Within the field of computer vision, facial recognition is an area of research and development which deals with giving machines the ability to recognize and verify human faces."
                url="face-recognition"
                />
                <Product
                src="https://miro.medium.com/max/2560/0*BxWu-Frzzc4lk_qT.png"
                title="Intelligent Document Processor"
                description="IDP uses machine learning and artificial intelligence to quickly extract data from forms for use in your Appian applications. It even gets smarter and better the more you use it."
                url="http://idp-ml-react.s3-website.us-east-2.amazonaws.com/"
                />
              </div>
            </section>
          }
          {
            this.state.selectedMenu === 'computerVision' &&
            <section>
              <h2 className="heading">Computer Vision</h2>
              <p className="subHeading">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <div className="products">
                <Product
                src="https://miro.medium.com/max/660/1*enzZrRQ_EwtfJJKOffrcFg.png"
                title="Face Recognition"
                description="Within the field of computer vision, facial recognition is an area of research and development which deals with giving machines the ability to recognize and verify human faces."
                url="face-recognition"
                />
              </div>
            </section>
          }

          {
            this.state.selectedMenu === 'nlp' &&
              <section>
                <h2 className="heading">Natural Language Processing</h2>
                <p className="subHeading">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className="products">
                  <Product
                  src="https://miro.medium.com/max/2560/0*BxWu-Frzzc4lk_qT.png"
                  title="Intelligent Document Processor"
                  description="IDP uses machine learning and artificial intelligence to quickly extract data from forms for use in your Appian applications. It even gets smarter and better the more you use it."
                  url="http://idp-ml-react.s3-website.us-east-2.amazonaws.com/"
                  />
                </div>
              </section>
          }
        </div>
      </div>
    )
  }
}


export default Dashboard
