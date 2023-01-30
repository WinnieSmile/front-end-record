import React from "react";
const Component = React.Component;
// import React, { Component } from "react"  //解构赋值，等价于上面两行代码

class App extends Component {
  render() {
    return (
      <ul className="my-list">
        <li>{false ? "JSPang.com" : "技术胖"}</li>
        <li>I love React</li>
      </ul>
    );
    // JavaScript写法：
    // var child1 = React.createElement('li', null, 'JSPang.com');
    // var child2 = React.createElement('li', null, 'I love React')
    // var root = React.createElement('ul', { className:'my-list' }, child1, child2)
  }
}
export default App;
