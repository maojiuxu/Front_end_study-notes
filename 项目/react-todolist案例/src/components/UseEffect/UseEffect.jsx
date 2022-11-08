import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function UseEffect(props) {
    let [count, setCount] = useState(0);
    let [num, setNum] = useState(100);

    // 使用useEffect()
    // useEffect(() => {
    //     console.log('同时模拟componentDidMount 和 componentDidUpdate');
    // })
    useEffect(() => {
        console.log('单独模拟componentDidMount'); //必须使用第二个参数(空数组): []
    }, [])


    // 监测state数据改变
    useEffect(() => {
        console.log("count改变了！");
    }, [count])

    useEffect(() => {
        return () => {
            console.log("模拟 componentWillUnmount 组件将要卸载时调用");
        }
    }, [])


    let addCount = () => {
        setCount(++count)
    }

    let addNum = () => {
        setNum(++num)
    }

    return (
        <div>

            {`count:${count}`}<br />
            <button onClick={addCount}>增加count</button> <br />
            {`num:${num}`}<br />
            <button onClick={addNum}>增加num</button>
        </div>
    );
}

export default UseEffect;