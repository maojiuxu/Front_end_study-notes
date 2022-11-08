import React, { Component } from 'react';
import moment from 'moment';

class Life extends Component {
    state = {
        time: moment().format("YYYY-MM-DD HH:mm:ss")
    }

    timer;

    // 组件被挂载(渲染)后调用(即调用render后)
    componentDidMount() {  // 只调用一次(数据改变不会调用componentDidMount()，但是当组件的DOM树结构改变时会被调用(空格也算))
        console.log("调用了componentDidMount函数");
        this.timer = setInterval(() => {
            this.setState({
                time: moment().format("YYYY-MM-DD HH:mm:ss")
            })
        }, 1000);
    }

    // 组件将要被卸载前调用
    componentWillUnmount() {
        console.log("调用了钩子函数：componentWillUnmount()");
        clearInterval(this.timer)
    }

    render() {
        // let timer = setInterval(() => {
        //     this.setState({
        //         time: moment().format("YYYY-MM-DD HH:mm:ss")
        //     })
        //     console.log(123);
        //     clearInterval(timer)
        // }, 1000);
        return (
            <div style={{ margin: "50px auto", width: 500, height: 100, border: "2px solid skyblue", textAlign: "center", lineHeight: "100px", fontSize: "30px" }} >
                {this.state.time}
            </div>
        );
    }
}

export default Life;