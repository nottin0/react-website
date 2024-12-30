import { useEffect, useState, useRef } from "react";
import "./TodoApp.css";
import cat from "../../assets/cat.gif";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { toast } from 'react-toastify';
import supabase from "../../supabaseClient";
import { useAuth } from "../../AuthContext";
import React from "react";

interface Todo {
  id: string;
  text: string;
  category: string;
  completed: boolean;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toastShown, setToastShown] = useState<boolean[]>(Array(todos.length).fill(false));
  const todoText = useRef<HTMLInputElement>(null);
  const todoCategory = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, [user]);

  async function fetchTodos() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      toast.error('Error fetching todos!');
    } finally {
      setIsLoading(false);
    }
  }

  async function addTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!todoCategory.current || !todoText.current || !user) return;

    const newTodo = {
      user_id: user.id,
      text: todoText.current.value,
      category: todoCategory.current.value,
      completed: false
    };

    try {
      const { error } = await supabase
        .from('todos')
        .insert([newTodo]);

      if (error) throw error;
      
      toast.success('Todo added successfully!');
      fetchTodos(); // Refresh the list
      todoText.current.value = "";
      todoCategory.current.value = "";
    } catch (error) {
      toast.error('Error adding todo!');
    }
  }

  async function clearTodos() {
      try {
         const { error } = await supabase
         .from('todos')
         .delete()
         .eq('user_id', user?.id);
   
         if (error) throw error;
         
         toast.success('All todos cleared successfully!');
         fetchTodos(); // Refresh the list
      } catch (error) {
         toast.error('Error clearing todos!');
      }
  }

  async function toggleTodo(id: string, completed: boolean) {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !completed })
        .eq('id', id);
      if (error) throw error;
      toast.success('Todo updated successfully!');
      fetchTodos(); // Refresh the list
    } catch (error) {
      toast.error('Error updating todo!');
    }
  }

  async function handleTodoDoubleClick(id: string) {
    // Ask for confirmation before deleting
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        const { error } = await supabase
          .from('todos')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        toast.success('Todo deleted successfully!');
        fetchTodos(); // Refresh the list
      } catch (error) {
        toast.error('Error deleting todo!');
      }
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
              onDoubleClick={() => handleTodoDoubleClick(todo.id)}
              title="Double-click to delete"
            >
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onClick={() => toggleTodo(todo.id, todo.completed)}
              />
              <span className="todo-text">{todo.text}</span>
              <span className="todo-category">{todo.category}</span>
            </li>
          ))}
        </ul>
      )}
      
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="todo-stats">
        <p>You have {todos.length} things to do... good luck!</p>
      </div>
      
      <Footer /> 
    </div>
  );
}

export default TodoApp;
