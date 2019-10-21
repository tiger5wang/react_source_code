// React.createElement: 创建虚拟DOM

import { createVnode } from './my_vdom';


function createElement(type, props, ...children) {
    console.log(arguments);
    delete props.__source;  // 删除没用的属性
    props.children = children;   // 将children属性 赋值给 props.children
    let vtype;  // 将用于区分组件类型
    console.log(typeof type)
    if(typeof type === 'string') {   //原生 H5 标签， div, p, span, img, a 等等
        vtype = 1  // 原生标签 设置 vtype = 1
    } else if(typeof type === 'function') {  // 此种情况可能是 函数组件，也可能是 class 组件
        // 用 Object.prototype.toString.call(type) 方法也不能区分函数组件，class组件，值都是 [object Function]
        // 此处用class组件的静态属性 isClassComponent 来判断
        if(type.isClassComponent) {
            vtype = 2  // class组件
        } else {
            vtype = 3  // 函数组件
        }
    }

    // return {type, props}  // 返回新的 JS 对象
    return createVnode(vtype, type, props)
}

// 添加component类
export class Component {
    static isClassComponent = true;
    constructor(props) {
        this.props = props;
        this.state = {}  // 现在state 知识一个占位符
    }
}

export default {createElement}

