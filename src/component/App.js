import React from "react";
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimationControl from "./AnimationControl/AnimationControl";
import Stage from "./Stage/Stage";
import TimeLine from "./TimeLine/TimeLine";
import Animator from './Animator';

export default class App extends React.Component {
  state = {
    animator: null
  };

  componentDidMount() {
    let an = new Animator()
    this.setState({animator: an})
  }

  render() {
    return (
      <div className='container-fluid'> 
        <Stage></Stage>
        <AnimationControl animator={this.state.animator}></AnimationControl>
        <TimeLine></TimeLine>
      </div>
    );
  }
}