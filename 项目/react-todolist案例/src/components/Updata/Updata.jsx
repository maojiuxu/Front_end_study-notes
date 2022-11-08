import React from "react";

export default class Updata extends React.Component {
    state = {
        arr: ['html', 'css', 'js', 'dom', 'bom', 'express', 'nodejs']
    }
    inp = React.createRef();
    ul = React.createRef();
    getdata = () => {
        let value = this.inp.current.value;
        this.setState({
            arr: [...this.state.arr, value]
        })
        this.inp.current.value = '';
        this.ul.current.scrollTop = this.ul.current.scrollHeight;
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.inp} /><button onClick={this.getdata} >提交</button>
                <ul ref={this.ul} style={{ width: 200, height: 200, border: "2px solid black", overflow: "auto" }}>
                    {
                        this.state.arr.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}