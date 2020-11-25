import React from "react";
import './Stage.css';

export default class Stage extends React.Component {
  state = {};

  render() {
    return (
      <div className="row mt-2 mb-4">
        <div className="col-12">
          <div id='stage'>
            <div id="animated-object"></div>
          </div>
        </div>
      </div>
      
    );
  }
}