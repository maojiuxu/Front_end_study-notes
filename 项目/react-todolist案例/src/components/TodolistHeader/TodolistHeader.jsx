import React, { useState } from 'react';
import './TodolistHeader.css'

function TodolistHeader(props) {
    let { addtodo } = props;
    let [title, setTitle] = useState("");

    let change = (e) => {
        setTitle(e.target.value);
    }

    let keyup = (e) => {
        if (e.keyCode === 13 && title.length !== 0) {
            // 调用添加函数
            addtodo(title);
            // 清空输入框
            setTitle('');
        }
    }
    return (
        <div className="todo-header">
            <input value={title} onChange={change} onKeyUp={keyup} type="text" placeholder="请输入你的任务名称，按回车键确认" />
        </div>
    );
}

export default TodolistHeader;