import React, { Component } from 'react';

class Draw extends Component {

    state = {
        r: 0,
        g: 0,
        b: 0
    }
    getData(type) {
        return (e) => {
            this.setState({
                [type]: e.target.value
            })
        }
    }

    render() {
        let { r, g, b } = this.state;
        return (
            <div>
                <h2>调色板</h2>
                <div style={{ width: 200, height: 200, border: "1px solid black", backgroundColor: `rgb(${r}, ${g}, ${b})` }}></div>
                R:<input type="range" min="0" max="255" step="1" value={r} onChange={this.getData("r")} /><br />
                G:<input type="range" min="0" max="255" step="1" value={g} onChange={this.getData("g")} /><br />
                B:<input type="range" min="0" max="255" step="1" value={b} onChange={this.getData("b")} /><br />
            </div>
        );
    }
}

export default Draw;