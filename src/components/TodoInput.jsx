import React, { useState } from 'react'

export default function TodoInput(props) {

    const {handleAddTodo,todoValue,setTodoValue} = props


  return (
    <div>
      <header>
        <input type="text" value={todoValue} onChange={(e)=>{
            setTodoValue(e.target.value)
        }}/>
        <button onClick={()=>{
            handleAddTodo(todoValue)
        }}>Add</button>
      </header>
    </div>
  )
}
