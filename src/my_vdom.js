/**
 * 将 createElement 返回的结果 js对象转换为 vdom
 **/

export function createVnode(vtype, type, props) {
    let vnode = {
        vtype: vtype,  // 用于区分 原生组件，函数组件，类组件
        type: type,
        props: props
    };
    return vnode
}

// 将虚拟DOM 转换成 真实DOM
export function initVnode(vnode) {
    let {vtype} = vnode;  // 取出 vtype 的值

    if(!vtype) {
        // 没有 vtype, 则表示这是一个文本节点
        /**
         * 下面是文本节点的内容
         * children: ["这是一个p标签"]
         * children是父节点的属性，他的内容就是一个纯文本节点
         * 纯文本节点没有 vtype 属性
         * */
        return document.createTextNode(vnode)
    }
    if(vtype === 1) {
        // 这是原生元素，因为可能会有 数组的 map 方法组成的子元素，所以不能直接使用下面的方法创建元素
        // return document.createElement(vtype)
        return createElements(vnode)
    } else if(vtype === 2) {
        // 类组件
        return createClassComp(vnode)
    } else if(vtype === 3) {
        // 函数组件
        return createFuncComp(vnode)
    }
}

// 创建原生元素
function createElements(vnode) {
    const {type, props} = vnode;
    const {key, children, ...rest} = props;
    // 创建元素
    const node = document.createElement(type);
    // vnode添加 key 属性
    vnode.key = key;

    // 过滤 key, children等特殊 props
    Object.keys(rest).forEach(k => {
        // 特殊处理属性名className, htmlFor,
        // style处理比较复杂，这里先不处理
        if(k === 'className') {
            node.setAttribute('class', rest[k]);
        } else if(k === 'htmlFor') {
            node.setAttribute('for', rest[k]);
        } else {
            node.setAttribute(k, rest[k])
        }
    });

    // 递归初始化子元素
    children.map(child => {
        //子元素也是一个 vnode, 所以需要 调用 initVnode 初始化
        node.appendChild(initVnode(child))
    });

    return node
}

// 创建 class 组件
function createClassComp(vnode) {
    const {type, props} = vnode;
    /**
     * 注意此处的 type 是整个 class 组件
     * type: class ClassComp
     * 所以，可以使用 new type() 的形式创建组件实例
    */
    const comp = new type(props);
    // 调用其render方法获得 vdom
    const newNode = comp.render();
    // 初始化 vdom,并返回
    return initVnode(newNode)

}

function createFuncComp(vnode) {
    const {type, props} = vnode;
    /**
     * 注意此处的 type 是整个函数组件，即一个完整的函数
     * type: ƒ FunComp(props)
     * 所以，直接执行函数就可以获取 vdom
     * */
    // 执行函数返回 vdom
    const newNode = type(props);
    // 初始化 vdom, 并返回
    return initVnode(newNode)
}


