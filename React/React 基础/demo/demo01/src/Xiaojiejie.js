import React, { Component, Fragment } from "react";
import "./style.css";
import XiaojiejieItem from "./XiaojiejieItem";

class Xiaojiejie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "jspang",
      list: [
        {
          name: "精油护发",
          value: "精油护发",
        },
        {
          name: "烫染",
          value: "烫染",
        },
      ],
    };
  }

  render() {
    return (
      <Fragment>
        <label htmlFor="jspang">加入服务：</label>
        <input
          id="jspang"
          className="input"
          value={this.state.inputValue}
          onChange={this.changeValue.bind(this)}
          ref={(input) => {
            this.input = input;
          }}
        />
        <button onClick={this.addList.bind(this)}>添加服务</button>
        <ul ref={(ul)=>{this.ul=ul}}>
          {this.state.list.map((item, index) => {
            return (
              <XiaojiejieItem
                key={index + item}
                content={item}
                index={index}
                testName="测试名称"
                deleteItem={this.deleteItem.bind(this)}
              />
            );
          })}
        </ul>
      </Fragment>
    );
  }

  changeValue(e) {
    this.setState({
    //   inputValue: e.target.value,
      inputValue: this.input.value,
    });
  }

  addList() {
    // setState是个异步函数，它提供了一个回调函数
    this.setState({
      list: [
        ...this.state.list,
        { name: this.state.inputValue, value: this.state.inputValue },
      ],
      inputValue: "",
    },()=>{
        // console.log('后执行', this.ul.querySelectorAll('div').length)
    });
    // console.log("在setState之前先执行", this.ul.querySelectorAll("div").length);
  }

  deleteItem(index) {
    let list = this.state.list;
    list.splice(index, 1);
    this.setState({
      list: list,
    });
  }
}

export default Xiaojiejie;
