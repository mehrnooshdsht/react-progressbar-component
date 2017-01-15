import React, { Component } from 'react';
import styles from './ProgressBar.scss';

export default class ProgressBar extends Component {

  state = {
    isClicked: false,
    offset: 0 //use to set the left of draggable and width of progress
  };

  setBar() {
    const { offset } = this.state;
    this.draggable.style.left = `${offset-1}px`; //for better view
    this.progress.style.width = `${offset}px`;
  };

  mouseDownHandler() {
    event.preventDefault();
    this.setState({
      isClicked : true
    });
  }

  mouseUpHandler() {
    event.preventDefault();
    this.setState({
      isClicked : false
    });
  }

  mouseMoveHandler(e) {
    if (this.state.isClicked === true) {
      const parentPosition = this.bar.offsetLeft;
      const parentWidth = this.bar.getBoundingClientRect().width;
      e = e || window.event;
      let dragX = e.pageX;
      this.setState({
        offset: (dragX - parentPosition) <= 300 ? dragX - parentPosition : parentWidth
      });
      this.setBar();
    }
  }

  render() {
    return (
      <div id="bar" ref={(div) => { this.bar = div; }} onMouseDown={this.mouseDownHandler.bind(this)} onMouseUp={this.mouseUpHandler.bind(this)} onMouseLeave={this.mouseUpHandler.bind(this)} onMouseMove={this.mouseMoveHandler.bind(this)}>
        <div id="progress" ref={(div) => { this.progress = div; }}>
        </div>
        <div id="draggable" ref={(div) => { this.draggable = div; }}>
        </div>
      </div>
    );
  }
}