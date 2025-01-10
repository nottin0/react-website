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

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toastShown, setToastShown] = useState<boolean[]>(Array(todos.length).fill(false));
  const todoText = useRef<HTMLInputElement>(null);
  const todoCategory = useRef<HTMLInputElement>(null);
  const todoLevel = useRef<HTMLInputElement>(null);
  const todoDate = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [importanceLevel, setImportanceLevel] = useState<string>('1'); // Default importance level is 1

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, [user]);

  const handleImportanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImportanceLevel(event.target.value);
  };

  const getImportanceColor = (level: string) => {
    switch (level) {
      case '1':
        return 'green'; // Green for level 1
      case '2':
        return 'yellow'; // Yellow for level 2
      case '3':
        return 'red'; // Red for level 3
      default:
        return 'gray'; // Default color if level is not recognized
    }
  };

  const getImportanceEmoji = (level: string) => {
    switch (level) {
      case '1':
        return '🔄'; // Emoji for level 1
      case '2':
        return '⚠️'; // Emoji for level 2
      case '3':
        return '🚨'; // Emoji for level 3
      default:
        return ''; // No emoji if level is not recognized
    }
  };

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
    if (!todoCategory.current || !todoText.current || !todoDate.current || !user) return;

    const newTodo = {
        user_id: user.id,
        text: todoText.current.value,
        category: todoCategory.current.value,
        completed: false,
        date: todoDate.current.value ? new Date(todoDate.current.value).toISOString().split('T')[0] : null // Format date
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

  async function addTodoWithDate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!todoDate.current || !todoCategory.current || !todoText.current || !user) return;

    const newTodo = {
        user_id: user.id,
        text: todoText.current.value,
        category: todoCategory.current.value,
        completed: false,
        date: todoDate.current.value ? new Date(todoDate.current.value).toISOString().split('T')[0] : null, // Format date
        importanceLevel: importanceLevel // Ensure this is included
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
        console.error(error); // Log the error for debugging
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header />
      <div className="flex items-center gap-4 mb-8">
        <img src={cat} alt="cat kissing camera" className="w-24 h-24 rounded-full border-4 border-teal-400" />
        <h1 className="text-4xl">My Todos</h1>
      </div>

      <form className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8" onSubmit={addTodoWithDate}>
        <div className="flex gap-4 mb-4">
          <input
            className="flex-1 p-4 rounded bg-gray-700 border border-gray-600"
            type="text"
            placeholder="What you gotta do?"
            ref={todoText}
          />
          <input
            className="flex-1 p-4 rounded bg-gray-700 border border-gray-600"
            type="text"
            placeholder="Category"
            ref={todoCategory}
          />
          <input
            className="flex-1 p-4 rounded bg-gray-700 border border-gray-600"
            type="date"
            ref={todoDate}
          />
        </div>
        <div className="flex gap-4 mb-4">
          <label>
            <input
              type="radio"
              value="1"
              checked={importanceLevel === '1'}
              onChange={handleImportanceChange}
            />
            Low
          </label>
          <label>
            <input
              type="radio"
              value="2"
              checked={importanceLevel === '2'}
              onChange={handleImportanceChange}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              value="3"
              checked={importanceLevel === '3'}
              onChange={handleImportanceChange}
            />
            High
          </label>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 p-4 bg-teal-400 text-gray-900 rounded font-bold transition-colors hover:bg-teal-300" type="submit">Add</button>
          <button className="flex-1 p-4 bg-red-500 text-white rounded font-bold transition-colors hover:bg-red-400" type="button" onClick={clearTodos}>
            Clear All
          </button>
        </div>
      </form>

      {todos.length > 0 && (
        <ul className="space-y-4">
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`p-4 rounded bg-gray-800 flex items-center gap-4 ${todo.completed ? "line-through" : ""}`}
              onDoubleClick={() => handleTodoDoubleClick(todo.id)}
              title="Double-click to delete"
              style={{ borderLeft: `4px solid ${getImportanceColor(todo.importanceLevel)}` }}
            >
              <input
                type="checkbox"
                className="w-6 h-6 accent-teal-400"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, todo.completed)}
              />
              <span className="flex-1">{todo.text} {getImportanceEmoji(todo.importanceLevel)}</span>
              <span className="bg-teal-400 text-gray-900 px-2 py-1 rounded-full">{todo.category}</span>
              <span className="bg-teal-400 text-gray-900 px-2 py-1 rounded-full">{todo.date}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="text-center mt-8">
        <p className="text-lg text-gray-400">You have {todos.length} things to do... good luck!</p>
      </div>

      <Footer />
    </div>
  );
}

export default TodoApp;
