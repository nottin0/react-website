import { useEffect, useState, useRef } from "react";
import "./TodoApp.css";
import cat from "../../assets/cat.gif";
import github from "../../assets/github-mark-white.svg";
import Header from "../Header";

function TodoApp() {
   const [todos, setTodos] = useState([]);
   const todoText = useRef();
   const todoCategory = useRef();

   useEffect(() => {
      const existingTodos = localStorage.getItem("todos");
      setTodos(existingTodos ? JSON.parse(existingTodos) : []);
   }, []);

   useEffect(() => {
      document.title = `todo list | ${todos.length} todos`;
   }, [todos]);

   function addTodo() {
      const next = [
         ...todos,
         {
            text: todoText.current.value,
            category: todoCategory.current.value,
            completed: false,
         },
      ];
      setTodos(next);
      event.preventDefault();
      localStorage.setItem("todos", JSON.stringify(next));
      todoText.current.value = "";
      todoCategory.current.value = "";
   }

   function clearTodos() {
      setTodos([]);
      localStorage.setItem("todos", JSON.stringify([]));
   }

   function toggleTodo(index) {
      const next = todos.map((todo, i) =>
         i === index ? { ...todo, completed: !todo.completed } : todo,
      );
      setTodos(next);
      localStorage.setItem("todos", JSON.stringify(next));
   }

   return (
      <div>
         <Header />
         <img src={cat} alt="cat kissing camera" />
         {todos.length > 0 && (
            <ul>
               {todos.map((todo, index) => (
                  <li
                     key={index}
                     style={{
                        textDecoration: todo.completed
                           ? "line-through"
                           : "none",
                     }}
                  >
                     <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(index)}
                     />
                     {todo.text} - <em>{todo.category}</em>
                  </li>
               ))}
            </ul>
         )}
         <form onSubmit={addTodo}>
            <input
               type="text"
               placeholder="What you gotta do?"
               ref={todoText}
            />
            <input type="text" placeholder="Category" ref={todoCategory} />
            <button type="submit">Add</button>
            <button type="button" onClick={clearTodos}>
               Clear
            </button>
         </form>
         <p>You have {todos.length} things to do... good luck!</p>
      </div>
   );
}

export default TodoApp;
