import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


export default class AlertTexts extends Component {
  render() {
    return (
      <div>
          <ToastContainer
          position="bottom-right"
          type="default"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          />
      </div>
    );
  }
}
