import React, { Component } from 'react';
import RefOne from '../../components/RefOne/RefOne'
import RefTwo from '../../components/RefTwo/RefTwo';
import RefThree from '../../components/RefThree/RefThree';
import Uncontrolled from '../../components/Uncontrolled/Uncontrolled';
import Controlled from '../../components/Controlled/Controlled';
import Draw from '../../components/Draw/Draw';
import Life from '../../components/Life/Life';
import Updata from '../../components/Updata/Updata';

class Refs extends Component {
    render() {
        return (
            <div>
                {/* <RefOne></RefOne>
                <RefTwo></RefTwo>
                <RefThree></RefThree> */}
                {/* 非受控组件 */}
                {/* <Uncontrolled></Uncontrolled> */}
                {/* 受控组件 */}
                {/* <Controlled></Controlled> */}
                {/* 调色板 */}
                {/* <Draw></Draw> */}
                {/* 时钟(生命周期componentDidMount()方法) */}
                {/* <Life></Life> */}
                <Updata></Updata>
            </div>
        );
    }
}

export default Refs;