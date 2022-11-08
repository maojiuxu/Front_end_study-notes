import React, { Component } from 'react';
import './Mv.css';
import PropsTypes from 'prop-types';

class Mv extends Component {

    static propsTypes = {
        mvData: PropsTypes.array.isRequired
    }

    render() {
        // 接收Home传来的数据
        let { mvData } = this.props;
        return (
            <div className='mv'>
                <ul>
                    {
                        mvData.map((item, index) => { // map一定要有返回值(return)
                            return (
                                <li key={item.id} className="oneData">
                                    <img src={item.cover} alt="" />
                                    <div>{item.artistName.length > 5 ? (item.artistName.slice(0, 6) + '...') : item.artistName}</div>
                                    <div>{item.name.length > 5 ? (item.name.slice(0, 6) + '...') : item.name}</div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Mv;