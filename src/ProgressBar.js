import React, { Component } from 'react';
import styles from './ProgressBar.scss';

export default class ProgressBar extends Component {

  isDragging  = false;

  state = {
    offset: 0 //use to set the left of draggable and width of progress
  };

  setBar = () => {
    const { offset } = this.state;
    this.draggable.style.left = `${offset-1}px`; //for better view
    this.progress.style.width = `${offset}px`;
  };

  mouseDownHandler = event => {
    event.preventDefault();
    this.isDragging = true;
  }

  mouseUpHandler = event => {
    event.preventDefault();
    this.isDragging = false;
  }

  mouseMoveHandler = event => {
    if (this.isDragging  === true) {
      const parentPosition = this.bar.offsetLeft;
      const parentWidth = this.bar.getBoundingClientRect().width;
      event = event || window.event;
      const dragX = event.pageX;
      const offset = (dragX - parentPosition) <= 300 ? dragX - parentPosition : parentWidth
      this.setState({
        offset
      });
      this.setBar();
    }
  }

  render() {
    return (
      <div
        id="bar"
        ref={(div) => { this.bar = div; }}
        onMouseDown={this.mouseDownHandler}
        onMouseUp={this.mouseUpHandler}
        onMouseLeave={this.mouseUpHandler}
        onMouseMove={this.mouseMoveHandler}
      >
        <div
          id="progress"
          ref={(div) => { this.progress = div; }}
        >
        </div>
        <div
          id="draggable"
          ref={(div) => { this.draggable = div; }}
        >
        </div>
      </div>
    );
  }
}