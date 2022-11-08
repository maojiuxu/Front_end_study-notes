import React, { useRef } from 'react';

function UseRef() {
    let input = useRef();
    let div = useRef();

    let getdata = () => {
        div.current.innerHTML = input.current.value;
        input.current.value = '';
    }
    return (
        <div>
            <input ref={input} type="text" />
            <button onClick={getdata}>获取</button>
            <div ref={div} style={{ width: 200, height: 200, border: "1px solid red" }}></div>
        </div>
    );
}

export default UseRef;