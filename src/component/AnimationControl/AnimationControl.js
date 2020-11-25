import React from "react";
import './AnimationControl.css';
import '@fortawesome/fontawesome-free/css/all.css';

export default class AnimationControl extends React.Component {
  state = {};

  componentDidMount() {
    // console.log('control props')
    // console.log(this.props)
  }

  render() {
    return (
      <div className="row mt-2 mb-4">
        <div className="col-12 text-center">
          <button className="btn" onClick={() => {this.props.animator.play()}}><i className="fas fa-save"></i></button>
        </div>
        <div className="col-6">
          <button className="btn" onClick={() => {this.props.animator.play()}}><i className="fas fa-play"></i></button>
          <button className="btn"><i className="fas fa-pause"></i></button>
          <button className="btn"><i className="fas fa-stop"></i></button>
        </div>
        <div className="col-6 text-right">
          <button className="btn" onClick={() => {this.props.animator.play()}}><i className="fas fa-minus"></i></button>
          <button className="btn"><i className="fas fa-plus"></i></button>
        </div>
      </div>
      
    );
  }
}