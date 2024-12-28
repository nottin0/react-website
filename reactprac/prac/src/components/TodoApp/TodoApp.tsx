import { useEffect, useState, useRef } from "react";
import "./TodoApp.css";
import cat from "../../assets/cat.gif";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { toast } from 'react-toastify';
import React from "react";

interface Todo {
  text: string;
  category: string;
  completed: boolean;
}

function TodoApp() {
   const [todos, setTodos] = useState<Todo[]>([]);
   const [toastShown, setToastShown] = useState<boolean[]>(Array(todos.length).fill(false));
   const todoText = useRef<HTMLInputElement>(null);
   const todoCategory = useRef<HTMLInputElement>(null);
   const [categories, setCategories] = useState<string[]>(() => {
      const savedCategories = localStorage.getItem('categories');
      return savedCategories ? JSON.parse(savedCategories) : [];
   });

   useEffect(() => {
      const existingTodos = localStorage.getItem("todos");
      setTodos(existingTodos ? JSON.parse(existingTodos) : []);
   }, []);

   useEffect(() => {
      document.title = `Todo App`;
   }, [todos]);

   function addTodo(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (!todoCategory.current || !todoText.current) return;
      
      const newCategory = todoCategory.current.value;
      if (newCategory && !categories.includes(newCategory)) {
         const updatedCategories = [...categories, newCategory];
         setCategories(updatedCategories);
         localStorage.setItem('categories', JSON.stringify(updatedCategories));
      }
      
      const next = [
         ...todos,
         {
            text: todoText.current?.value,
            category: newCategory,
            completed: false,
         },
      ];
      setTodos(next);
      localStorage.setItem("todos", JSON.stringify(next));
      todoText.current.value = "";
      todoCategory.current.value = "";
   }

   function clearTodos() {
      setTodos([]);
      localStorage.setItem("todos", JSON.stringify([]));
   }

   function deleteTodo(index: number, event: React.MouseEvent) {
      event.preventDefault();
      const next = todos.filter((todo, i) => i !== index);
      setTodos(next);
      localStorage.setItem("todos", JSON.stringify(next));
   }

   function toggleTodo(index: number) {
      const todo = todos[index];
      if (!toastShown[index]) {
         toast.info("click checkbox again to delete");
         setToastShown((prev) => {
            const newToastShown = [...prev];
            newToastShown[index] = true; // mark as shown
            return newToastShown;
         })
      }
      if (todo.completed) {
         deleteTodo(index, event as unknown as React.MouseEvent); // removes the todo from the list once user is done
      } else {
         const next = todos.map((todo, i) => i === index ? { ...todo, completed: !todo.completed } : todo);
         setTodos(next);
         localStorage.setItem("todos", JSON.stringify(next));
      }
   }

   return (
      <div className="todo-container">
         <Header />
         <div className="todo-header">
            <img src={cat} alt="cat kissing camera" />
            <h1>My Todos</h1>
         </div>
         
         <form className="todo-form" onSubmit={addTodo}>
            <div className="todo-input-group">
               <input
                  className="todo-input"
                  type="text"
                  placeholder="What you gotta do?"
                  ref={todoText}
               />
               <input
                  className="todo-input"
                  type="text"
                  placeholder="Category"
                  ref={todoCategory}
               />
            </div>
            <div className="todo-buttons">
               <button className="todo-button todo-button-primary" type="submit">Add</button>
               <button className="todo-button todo-button-danger" type="button" onClick={clearTodos}>
                  Clear All
               </button>
            </div>
         </form>

         {todos.length > 0 && (
            <ul className="todo-list">
               {todos.map((todo, index) => (
                  <li
                     key={index}
                     className="todo-item"
                     style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                     }}
                  >
                     <input
                        type="checkbox"
                        className="todo-checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(index)}
                     />
                     <span className="todo-text">{todo.text}</span>
                     <span className="todo-category">{todo.category}</span>
                  </li>
               ))}
            </ul>
         )}
         
         <div className="todo-stats">
            <p>You have {todos.length} things to do... good luck!</p>
         </div>
         
       <Footer /> 
      </div>
   );
}

export default TodoApp;
