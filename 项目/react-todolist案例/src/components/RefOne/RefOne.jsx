import React, { Component } from 'react';
import './RefOne.css'

class RefOne extends Component {
    getData = () => {
        this.refs.div.innerHTML = this.refs.inp.value;
        this.refs.inp.value = '';
    }
    render() {
        return (
            <div>
                <input type="text" ref="inp" />
                <button onClick={this.getData}>获取数据</button>
                <div ref="div" style={{ width: "200px", height: "150px", border: "2px solid red" }}></div>
            </div>
        );
    }
}

export default RefOne;