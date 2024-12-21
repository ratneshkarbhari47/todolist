import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"
import React, { useState, useEffect } from 'react'


function App() {



  const [todos,setTodos] = useState([]);
  const [todoValue,setTodoValue] = useState('');


  
  function persistData(newTodoList){
    localStorage.setItem('todos',JSON.stringify({todos:newTodoList})) 
  }

  function handleAddTodo(newTodo){

    const newTodoList = [...todos,newTodo];
    persistData(newTodoList)
    setTodos(newTodoList)

  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo,todoIndex)=>{
      return todoIndex!=index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }


  useEffect(()=>{
    if(!localStorage){
      return
    }
    let localTodos = localStorage.getItem("todos")
    if(!localTodos){
      return 
    }
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  },[]);

  return (
    <>
      <TodoInput handleAddTodo={handleAddTodo} todoValue={todoValue} setTodoValue={setTodoValue}  />
      <TodoList handleDeleteTodo={handleDeleteTodo} todos={todos} handleEditTodo={handleEditTodo}/>
    </>
  )
}

export default App
