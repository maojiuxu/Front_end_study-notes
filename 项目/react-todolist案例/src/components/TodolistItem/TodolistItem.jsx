import React from 'react';
import { useState } from 'react';
import './TodolistItem.css'

function TodolistItem(props) {
    // console.log(props);
    let { title, done, id, deleitem, getcheck } = props;
    let [show, setShow] = useState(false);
    // console.log(deleitem);

    let changebtn = (bol) => {
        return () => {
            setShow(bol);
        }
    }

    let del = (id) => {
        return () => {
            deleitem(id);
        }
    }

    let checkbox = (id) => {
        return () => {
            getcheck(id);
        }
    }

    return (
        <li onMouseOver={changebtn(true)} onMouseOut={changebtn(false)}>
            <label>
                <input type="checkbox" checked={done} onChange={checkbox(id)} />
                <span>{title}</span>
            </label>
            <button onClick={del(id)} className="btn btn-danger" style={show ? { display: "block" } : { display: "none" }}>删除</button>
        </li>
    );
}

export default TodolistItem;