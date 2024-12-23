import { useEffect, useState, useRef } from 'react'
import cat from './assets/cat.gif'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const todoText = useRef();

  useEffect(() => {
    const existingTodos = localStorage.getItem('todos');
    setTodos(existingTodos ? JSON.parse(existingTodos) : []);
  }, []);

  useEffect(() => {
    document.title = `todo list | ${todos.length} todos`;
  }, [todos]);

  function addTodo(event) {
    event.preventDefault();
    const next = [...todos, { text: todoText.current.value, completed: false }];
    setTodos(next);
    localStorage.setItem('todos', JSON.stringify(next));
    todoText.current.value = '';
  }

  function clearTodos() {
    setTodos([]);
    localStorage.setItem('todos', JSON.stringify([]));
  }

  function toggleTodo(index) {
    const next = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(next);
    localStorage.setItem('todos', JSON.stringify(next));
  }

  return (
    <div>
      <h1>todo list</h1>
      <img src={cat} alt='cat kissing camera' />
      {todos.length > 0 && (
        <ul>
          {todos.map((todo, index) => (
            <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => toggleTodo(index)} 
              />
              {todo.text}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={addTodo}>
        <input type='text' placeholder='What you gotta do?' ref={todoText} />
        <input type='submit' value='add Todo' />
        <button onClick={clearTodos} type='button'>clear</button>
      </form>

      <p>you have {todos.length} things to do... good luck!</p>
    </div>
  )
}

export default App
