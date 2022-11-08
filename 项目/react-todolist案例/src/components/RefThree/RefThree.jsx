import React, { Component } from 'react';
import { createRef } from 'react';

class RefThree extends Component {

    inp = React.createRef();
    div = createRef();

    getData = () => {
        this.div.current.innerHTML = this.inp.current.value;
        this.inp.current.value = '';
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.inp} />
                <button onClick={this.getData}>获取数据</button>
                <div ref={this.div} style={{ width: "200px", height: "150px", border: "2px solid red" }}></div>
            </div>
        );
    }
}

export default RefThree;