import React from 'react';
import './TodolistFooter.css'

function TodolistFooter(props) {
    let { data, all, done, checkedall, clearDone } = props;
    // console.log(props);
    // let done = 0, all = 3;

    let checkbox = (e) => {
        checkedall(e.target.checked)
    }

    // let clear = () => {
    //     clearDone();
    // }
    return (
        <div className="todo-footer">
            <label>
                <input type="checkbox" onChange={checkbox} checked={data.every((item) => item.done) && data.length !== 0} />
            </label>
            <span>
                <span>已完成{done.length}</span> / 全部{all}
            </span>
            <button onClick={clearDone} className="btn btn-danger">清除已完成任务</button>
        </div>
    );
}

export default TodolistFooter;