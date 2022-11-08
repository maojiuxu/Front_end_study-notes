import React, { useState } from 'react'
import './Banner.css'
export default function Banner() {
    let [minimg, setMinimg] = useState(['./img/1.jpg', './img/2.jpg', './img/3.jpg', './img/4.jpg', './img/5.jpg',]);
    let [idx, setIdx] = useState(0);

    let change = function (index) {
        return () => {
            setIdx(index)
        }
    }

    return (
        <div className='banner'>
            <div className='maxing'>
                <img src={minimg[idx]} alt="" />
            </div>
            <ul className='imglist'>
                {
                    minimg.map((item, index) => {
                        return (
                            <li className={idx === index ? 'active' : null} key={index} onMouseOver={change(index)}>
                                <img src={item} alt="" />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}