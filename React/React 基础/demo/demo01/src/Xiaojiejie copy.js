import React, { Component, Fragment } from "react";
import "./style.css";

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
        />
        <button onClick={this.addList.bind(this)}>添加服务</button>
        <ul>
          {this.state.list.map((item, index) => {
            return (
              <li
                key={index + item.name}
                onClick={this.deleteItem.bind(this, index)}
                dangerouslySetInnerHTML={{ __html: item.name }}
              >
                {/* {item.name} */}
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }

  changeValue(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  addList() {
    this.setState({
      list: [
        ...this.state.list,
        { name: this.state.inputValue, value: this.state.inputValue },
      ],
      inputValue: "",
    });
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
