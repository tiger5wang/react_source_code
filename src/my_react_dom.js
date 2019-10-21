// ReactDOM.render: 渲染真实DOM

function render(vnode, container) {
    container.innerHTML = `<pre>${JSON.stringify(vnode, null, 2)}</pre>`
}

export default {render}