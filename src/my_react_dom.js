// ReactDOM.render: 渲染真实DOM

import {initVnode} from './my_vdom'

function render(vnode, container) {
    container.innerHTML = `<pre>${JSON.stringify(vnode, null, 2)}</pre>`
    const node = initVnode(vnode);
    container.appendChild(node)
}

export default {render}