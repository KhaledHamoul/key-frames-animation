import React from "react";
import './TimeLine.css';

export default class TimeLine extends React.Component {
  state = {};

  render() {
    return (
      <div className="row">
        <div className="col-12 mb-2">
          <div id='timeline'>
            <div className='timeline-cursor'></div>
          </div>
        </div>
        <div className="col-4">
          <span>0s</span>
        </div>
        <div className="col-4 text-center">
          <span>7.5s</span>
        </div>
        <div className="col-4 text-right">
          <span>15s</span>
        </div>
      </div>
    );
  }
}