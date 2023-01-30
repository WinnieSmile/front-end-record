import React, { Component } from "react";
import PropTypes from "prop-types"

class XiaojiejieItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return <div onClick={this.handleClick}>奔跑吧{this.props.testName} → {this.props.content.name}</div>;
  }

  handleClick() {
    this.props.deleteItem(this.props.index); //子组件调用父组件的 deleteItem 方法
  }
}

XiaojiejieItem.propTypes={
    content:PropTypes.object,
    index:PropTypes.number,
    deleteItem:PropTypes.func,
    // testName:PropTypes.string.isRequired
    testName:PropTypes.string
}

XiaojiejieItem.defaultProps={
    testName: "我是默认"
}
export default XiaojiejieItem;
