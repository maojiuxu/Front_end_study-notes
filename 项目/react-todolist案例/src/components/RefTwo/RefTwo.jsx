import React, { Component } from 'react';

class RefTwo extends Component {

    getData = () => {
        this.div.innerHTML = this.inp.value;
        this.inp.value = '';
    }

    render() {
        return (
            <div>
                <input ref={(el) => { this.inp = el }} type="text" />
                <button onClick={this.getData}>获取数据</button>
                <div ref={el => this.div = el} style={{ width: "200px", height: "150px", border: "2px solid red" }}></div>
            </div>
        );
    }
}

export default RefTwo;