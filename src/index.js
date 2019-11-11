// import React from 'react';
// import ReactDOM from 'react-dom';

import React, {Component} from './my_react';
import ReactDOM from './my_react_dom'

function FunComp(props) {
    return(
        <div>{props.name}</div>
    )
}

class ClassComp extends Component {
    render() {
        return(
            <div>{this.props.name}</div>
        )
    }
}

const projects = [
    {name: 'web', desc: 'web全栈架构师'},
    {name: 'python', desc: 'python高级工程师'}
]

// class Jsx extends Component {
//   render() {
//     return(
//       <div style={{color: 'red'}}>
//         <p key={'key1'}>这是一个p标签</p>
//         <FunComp name={'这是一个函数组件'}/>
//         <ClassComp name={'这是一个class组件'}/>
//         <ul>
//           {projects.map(p => (
//             <li key={p.name} onClick={() => {alert(p.name); console.log(this)}}>课程：{p.name}， 简介：{p.desc}</li>
//           ))
//           }
//         </ul>
//       </div>
//     )
//   }
// }

const Jsx = <div style={{color: 'red'}}>
  <p key={'key1'}>这是一个p标签</p>
  <FunComp name={'这是一个函数组件'}/>
  <ClassComp name={'这是一个class组件'}/>
  <ul>
    {projects.map(p => (
      <li key={p.name} onClick={() => {alert(p.name); console.log(this)}}>课程：{p.name}， 简介：{p.desc}</li>
    ))
    }
  </ul>
</div>;

console.log('Jsx', Jsx);   // 注意此处的Jsx不是上面的jsx语法表达式，而是 经过 React.createElement 编译过的 js 对象
/*
$$typeof: Symbol(react.element)
key: null
props: {children: Array(3)}
ref: null
type: "div"
_owner: null
_store: {validated: false}
_self: null
_source: {fileName: "C:\work\myProject\react-source-app\src\index.js", lineNumber: 19}
__proto__: Object
*/


ReactDOM.render(Jsx, document.getElementById('root'));

