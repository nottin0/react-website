import { useEffect, useState, useRef, ReactNode } from "react";
import cat from "../../assets/cat.gif";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { toast } from 'react-toastify';
import supabase from "../../supabaseClient";
import { useAuth } from "../../AuthContext";
import React from "react";

interface Todo {
  date: ReactNode;
  id: string;
  text: string;
  category: string;
  completed: boolean;
  importanceLevel: string;
}

function TodoApp({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean; toggleDarkMode: () => void }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoText = useRef<HTMLInputElement>(null);
  const todoCategory = useRef<HTMLInputElement>(null);
  const todoDate = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  
  useEffect(() => {
    fetchTodos();
  }, [user]);

  async function fetchTodos() {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      toast.error('Error fetching todos!');
    }
  }

  async function addTodoWithDate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!todoCategory.current || !todoText.current || !todoDate.current || !user) return;

    const newTodo = {
      user_id: user.id,
      text: todoText.current.value,
      category: todoCategory.current.value,
      completed: false,
      date: todoDate.current.value ? new Date(todoDate.current.value).toISOString().split('T')[0] : null,
      importanceLevel: '1' // Default importance level
    };

    try {
      const { error } = await supabase
        .from('todos')
        .insert([newTodo]);

      if (error) throw error;

      toast.success('Todo added successfully!');
      fetchTodos(); // Refresh the list
      if (todoText.current) todoText.current.value = "";
      if (todoCategory.current) todoCategory.current.value = "";
      if (todoDate.current) todoDate.current.value = "";
    } catch (error) {
      toast.error('Error adding todo!');
    }
  }

  const toggleTodoCompletion = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !completed })
        .eq('id', id);

      if (error) throw error;
      fetchTodos(); // Refresh the list
    } catch (error) {
      toast.error('Error updating todo!');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchTodos(); // Refresh the list
      toast.success('Todo deleted successfully!');
    } catch (error) {
      toast.error('Error deleting todo!');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-1 max-w-4xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-8">
          <img src={cat} alt="cat kissing camera" className="w-24 h-24 rounded-full border-4 border-teal-400" />
          <h1 className="text-4xl">My Todos</h1>
        </div>

        <form className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8" onSubmit={addTodoWithDate}>
          <div className="flex gap-4 mb-4">
            <input className="flex-1 p-4 rounded bg-gray-700 border border-gray-600" type="text" placeholder="What you gotta do?" ref={todoText} />
            <input className="flex-1 p-4 rounded bg-gray-700 border border-gray-600" type="text" placeholder="Category" ref={todoCategory} />
            <input className="flex-1 p-4 rounded bg-gray-700 border border-gray-600" type="date" ref={todoDate} />
          </div>
          <div className="flex gap-4">
            <button className="flex-1 p-4 bg-teal-400 text-gray-900 rounded font-bold transition-colors hover:bg-teal-300" type="submit">Add</button>
          </div>
        </form>

        {todos.length > 0 && (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li key={todo.id} className={`p-4 rounded bg-gray-800 flex items-center gap-4 ${todo.completed ? "line-through" : ""}`}>
                <span className="flex-1">{todo.text}</span>
                <span className="bg-teal-400 text-gray-900 px-2 py-1 rounded-full">{todo.category}</span>
                <span className="bg-teal-400 text-gray-900 px-2 py-1 rounded-full">{todo.date}</span>
                <button onClick={() => toggleTodoCompletion(todo.id, todo.completed)} className="bg-teal-400 text-gray-900 px-2 py-1 rounded-full">✓</button>
                <button onClick={() => deleteTodo(todo.id)} className="bg-red-400 text-white px-2 py-1 rounded-full">Delete</button>
              </li>
            ))}
          </ul>
        )}

        <Footer isDarkMode={isDarkMode} />
      </main>
    </div>
  );
}

export default TodoApp;

