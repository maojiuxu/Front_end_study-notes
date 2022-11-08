import React, { Component } from 'react';

class Uncontrolled extends Component {
    uname = React.createRef();
    pwd = React.createRef();

    getData = () => {
        let uname = this.uname.current.value;
        let pwd = this.pwd.current.value;
        console.log(uname, pwd);
    }

    render() {
        return (
            <div>
                <h2>非受控组件</h2>
                账号：<input ref={this.uname} type="text" /><br />
                密码：<input ref={this.pwd} type="password" /><br />
                <button onClick={this.getData}>登录</button>
            </div>
        );
    }
}

export default Uncontrolled;