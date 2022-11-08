import React from "react";
import './Header.css'

export default class Header extends React.Component {
    state = {
        headerData: [
            { title: '首页', flag: true },
            { title: 'HTML', flag: false },
            { title: 'CSS', flag: false },
            { title: 'JAVASCRIPT', flag: false },
            { title: 'NODEJS', flag: false },
            { title: 'REACT', flag: false }
        ],
        index: 0
    }

    changeNav = (i) => {
        return () => {
            // 获取state数据
            let newData = this.state.headerData;
            // 更改当前点击的数据
            newData[i].flag = true;
            // 更新当前下标并存储，为下次点击做准备
            newData[this.state.index].flag = false;

            // 改变每条数据的flag,必须用setState
            // 将更新的数据直接利用setState方法更新state数据，state数据更新后，会重新调用render方法
            this.setState({
                headerData: newData,
                index: i
            })
        }


    }


    render() {
        return (
            <div className="header">
                <ul>
                    {
                        this.state.headerData.map((item, index) => {
                            return (
                                <li key={index} className={item.flag ? 'bg' : null} onClick={this.changeNav(index)}>{item.title}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

