import React from 'react';
import './TodolistMain.css';
import TodolistItem from '../TodolistItem/TodolistItem';

function TodolistMain(props) {
    // 将数据解构出来
    let { data, deleitem, getcheck } = props;
    // console.log(props);

    return (
        <ul className="todo-main">
            {
                data.map((item, index) => {
                    return (
                        <TodolistItem getcheck={getcheck} key={item.id} {...item} deleitem={deleitem} ></TodolistItem>
                    )
                })
            }
            {
                data.length > 0 ? "" : <div className='todo-empty'>暂无数据</div>
            }

        </ul>
    );
}

export default TodolistMain;