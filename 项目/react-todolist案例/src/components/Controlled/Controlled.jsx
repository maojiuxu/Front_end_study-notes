import React, { Component } from 'react';

class Controlled extends Component {
    state = {
        username: '',
        pwd: ''
    }

    // 太麻烦需要封装
    //#region 
    // // 账号改变
    // unameChange = (e) => {
    //     this.setState({
    //         username: e.target.value
    //     })
    // }

    // // 密码改变
    // pwdChange = (e) => {
    //     this.setState({
    //         pwd: e.target.value
    //     })
    // }

    // // 获取数据
    // getData = () => {
    //     alert(this.state.username)
    //     alert(this.state.pwd)
    //     this.setState({
    //         username: '',
    //         pwd: ''
    //     })
    // }
    //#endregion

    // 封装：
    change = (propery) => {
        return (e) => {
            this.setState({
                [propery]: e.target.value
            })
        }
    }

    getData = () => { // 直接从state中获取数据
        for (const key in this.state) {
            console.log(this.state[key]);
            // 重置数据
            this.setState({
                [key]: ''
            })
        }
    }

    render() {
        return (
            <div>
                <h2>受控组件</h2>
                账号：<input type="text" value={this.state.username} onChange={this.change("username")} /><br />
                密码：<input type="password" value={this.state.pwd} onChange={this.change("pwd")} /><br />
                <button onClick={this.getData}>登录</button>
            </div>
        );
    }
}

export default Controlled;