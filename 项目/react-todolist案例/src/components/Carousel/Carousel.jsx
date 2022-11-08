import React, { useEffect, useState } from "react";
import './Carousel.css';

export default function Carousel() {
    let [count, setCount] = useState(1)

    let prev = () => {
        if (count == 1) {
            setCount(5);
        } else {
            setCount(--count);
        }
    }

    let next = () => {
        console.log("object");
        if (count == 5) {
            setCount(1);
        } else {
            setCount(++count);
        }
    }

    let timer = null;

    useEffect(() => {
        setTimeout(() => {
            next();
            console.log(count);
        }, 1000)

        //     timer = setInterval(() => {
        //         next();
        //         clearInterval(timer)
        //         console.log(count);
        //     }, 1000);
        // });

        // useEffect(() => {  // 更新
        //     setInterval(() => {
        //         next();
        //         console.log(111);
        //         console.log(count);
        //     }, 1000)
        // }, []);
    })
    return (
        <div className="carousel">
            {/* 顶部图片 */}
            <div className="imgs">
                <img src={`./img/${count}.jpg`} alt="" />
            </div>
            <div className="arow">
                <div className="left" onClick={prev}>&lt;</div>
                <div className="right" onClick={next}>&gt;</div>
            </div>
        </div>
    )
}