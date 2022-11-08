import React from 'react'
import './Footer.css'

export default class Footer extends React.Component {
    state = {
        dataArr: [
            { title: '联系我们', flag: false },
            { title: '联系我们', flag: false },
            { title: '联系我们', flag: false },
            { title: '联系我们', flag: false },
            { title: '联系我们', flag: false },
            { title: '联系我们', flag: false }
        ],
        index: 0
    }

    changeFooter = (i) => {
        return () => {
            // 获取state数据
            let newData = this.state.dataArr;
            // 更新当前下标并存储，为下次点击做准备
            newData[this.state.index].flag = false;
            // 更改当前点击的数据
            newData[i].flag = true;

            // 改变每条数据的flag,必须用setState
            // 将更新的数据直接利用setState方法更新state数据，state数据更新后，会重新调用render方法
            this.setState({
                dataArr: newData,
                index: i
            })
        }
    }


    render() {
        return (
            <div className='footer'>
                <ul>
                    {
                        this.state.dataArr.map((item, index) => {
                            return (
                                <li key={index} onClick={this.changeFooter(index)} className={item.flag ? 'bg' : null}>{item.title}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

