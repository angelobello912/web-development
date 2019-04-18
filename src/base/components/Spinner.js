import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

export default class Spinner extends Component {
  render() {
    const { isLoading } = this.props;
    if (!isLoading) {
      return null;
    }
    return (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%'
        }}
      >
        <Loader type="Circles" color="gray" height="50" width="50" />
      </div>
    );
  }
}
