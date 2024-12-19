import { useEffect, useState, useRef } from 'react'
import cat from './assets/cat.gif'
import './App.css'

function App() {
const [todos, setTodos] = useState([]);
const todoText = useRef();

useEffect(() => {
  const existingTodos = localStorage.getItem('todos');
  setTodos(existingTodos ? JSON.parse(existingTodos) : [])
}), [];


useEffect(() => {
  document.title = `todo list | ` + `${todos.length} todos`;
}, [todos]); // creates title for page seen in tab bar

function addTodo(event) {
  event.preventDefault(); // prevent the form from resetting on reload or submit
  const next = [...todos, todoText.current.value]; // copy the todos array and add the new todo
  setTodos(next); // set the new todos array
  localStorage.setItem('todos', JSON.stringify(next)); // grabs the todo data from local storage
  todoText.current.value = ''; // clear the input field
}

return (
  <div>
    <h1>todo list</h1>
    <img src={cat} alt='cat kissing camera' />
    <ul>
      {todos.map(todo => (<li key={todo}>{todo}</li>))}
    </ul>

    <form onSubmit={addTodo}>
      <input type='text' placeholder='What you gotta do?' ref={todoText}/>
      <input type = 'submit' value='add Todo' />
      <button onClick={() => setTodos([])} type='clear'>clear</button>
    </form>

    <p>you have {todos.length} things to do... good luck!</p>
  </div>
)


}

export default App
