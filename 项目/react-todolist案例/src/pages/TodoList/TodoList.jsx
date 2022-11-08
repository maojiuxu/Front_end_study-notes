import React from 'react';
import './TodoList.css'
import TodolistHeader from '../../components/TodolistHeader/TodolistHeader';
import TodolistMain from '../../components/TodolistMain/TodolistMain';
import TodolistFooter from '../../components/TodolistFooter/TodolistFooter';
import { useState } from 'react';
import { nanoid } from 'nanoid';

function TodoList(props) {
    let [data, setData] = useState([
        { id: 1, title: '做核酸', done: true },
        { id: 2, title: '学习', done: false },
        { id: 3, title: '跑步', done: false }
    ]);

    // 添加item
    let addtodo = (title) => {
        setData([
            ...data,
            {
                id: nanoid(),
                title: title,
                done: false
            }
        ])
    }

    // 删除item
    let deleitem = (id) => {
        let newdata = data.filter(item => item.id !== id);
        setData(newdata);
    }

    // 添加单个勾选
    let getcheck = (id) => {
        let newdata = data.map((item) => { // 只能用map返回一个新数组，不能用forEach(在原数组上做更改不会重新渲染)
            if (id === item.id) {
                item.done = !item.done;
            }
            return item;
        })
        setData(newdata);
    }

    // 底部全选
    let checkedall = (bol) => {
        let newdata = data.map((item) => {
            item.done = bol;
            return item;
        });
        setData(newdata);
    }

    // 清除已完成
    let clearDone = () => {
        let newdata = data.filter((item) => {
            return !item.done;
        });
        setData(newdata);
    }

    return (
        <div className="todo-container">
            <div className="todo-wrap">

                <TodolistHeader addtodo={addtodo}></TodolistHeader>
                <TodolistMain getcheck={getcheck} deleitem={deleitem} data={data}></TodolistMain>
                <TodolistFooter clearDone={clearDone} data={data} checkedall={checkedall} all={data.length} done={data.filter((item) => item.done === true)}></TodolistFooter>
            </div>
        </div>
    );
}

export default TodoList;