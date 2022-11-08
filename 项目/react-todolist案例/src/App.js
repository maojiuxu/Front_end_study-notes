import React from 'react'
import './app.css'

// 引入页面级组件 Home
// import Home from './pages/Home/Home'

// 引入页面级组件 Refs
// import Refs from './pages/Refs/Refs'

// 引入页面级组件 Hooks
// import Hooks from './pages/Hooks/Hooks'

// todolist案例
import TodoList from './pages/TodoList/TodoList'

// 创建类式组件
export default class App extends React.Component {
    render() {
        return (
            <div className='app'>
                {/* Home组件 */}
                {/* <Home></Home> */}
                {/* Refs组件 */}
                {/* <Refs /> */}
                {/* <Hooks></Hooks> */}
                <TodoList></TodoList>
            </div>
        )
    }
}
