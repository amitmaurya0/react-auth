import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal'
import { Button } from 'react-bootstrap'

export default class Home extends Component {
    constructor(props) {
        super(props);
    
        this.handleHide = this.handleHide.bind(this);
    
        this.state = {
          show: false 
        };
      }
    
      handleHide() {
        this.setState({ show: false });
      }
      render() {
        return (
          <div className="modal-container" style={{ height: 200 }}>
              <p>Home</p>
          </div>
        );
      }
}