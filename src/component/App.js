import React from "react";
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimationControl from "./AnimationControl/AnimationControl";
import Stage from "./Stage/Stage";
import TimeLine from "./TimeLine/TimeLine";
import Animator from './Animator';
import KeyframesManger from './KeyframesManger';

export default class App extends React.Component {
  state = {
    animator: null,
    keyframesManger: null
  };

  componentDidMount() {
    this.setState({
      animator: new Animator(),
      keyframesManger: new KeyframesManger()
    })
  }

  render() {
    return (
      <div className='container-fluid'> 
        <Stage></Stage>
        <AnimationControl animator={this.state.animator} keyframesManger={this.state.keyframesManger}></AnimationControl>
        <TimeLine></TimeLine>
      </div>
    );
  }
}