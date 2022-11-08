import React from "react";
import './Middle.css';

export default class Middle extends React.Component {

    // state = {
    //     midData: [
    //         { title: 'HTML', position: '精通', flag: false },
    //         { title: 'CSS', position: '了解', flag: false },
    //         { title: 'JS', position: '熟练掌握', flag: false },
    //         { title: 'NODEJS', position: '精通', flag: false },
    //         { title: 'LESS', position: '熟练掌握', flag: false },
    //         { title: 'JQUERY', position: '精通', flag: false },
    //         { title: 'BOOSTRAP', position: '熟练掌握', flag: false },
    //         { title: 'GIT', position: '精通', flag: false },
    //         { title: 'WEBPACK', position: '了解', flag: false },
    //         { title: 'REACT', position: '精通', flag: false },
    //         { title: 'AXIOS', position: '了解', flag: false }
    //     ]
    // }

    // changeMid = (i) => {
    //     return () => {
    //         // console.log(1)
    //         let data = this.state.midData;
    //         data[i].flag = !data[i].flag;

    //         this.setState({
    //             midData: data
    //         })
    //     }
    // }

    change = (i) => {
        return () => {
            this.props.cg(i); // 直接用，最好不要在render函数中解构，直接用this.props.cg()就好
        }
    }


    render() {
        // let { midData: md } = this.state;
        // this.props.children
        // console.log(this.props)
        let { midData } = this.props;
        return (
            <div className="middle">
                <ul>
                    {
                        midData.map((item, index) => {
                            return (<li key={index} onClick={this.change(index)}>
                                {/* // return (<li key={index} > */}
                                <h3>{item.title}</h3>
                                {
                                    item.flag ? <h4>{item.position}</h4> : null
                                }
                            </li>)
                        })
                    }
                </ul>
            </div>
        )
    }
}