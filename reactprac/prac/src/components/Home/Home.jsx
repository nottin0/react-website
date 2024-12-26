import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import Header from "../Header";
import "./Home.css";

function Home() {
   const { user } = useAuth();

   return (
      <div className="home">
         <Header />
         <main className="home-content">
            <h1>Welcome to Todo App</h1>
            {!user ? (
               <div className="auth-prompt">
                  <p>Please log in or sign up to manage your todos</p>
                  <div className="auth-buttons">
                     <Link to="/login" className="auth-button">Login</Link>
                     <Link to="/signup" className="auth-button">Sign Up</Link>
                  </div>
               </div>
            ) : (
               <div className="user-welcome">
                  <h2>yo, {user.displayName}!</h2>
                  <p>got stuff to do?</p>
                  <Link to="/todos" className="todo-button">Go to My Todos</Link>
               </div>
            )}
            <section className="features">
               <h3>Features</h3>
               <ul>
                  <li>Create and manage your todo lists</li>
                  <li>Organize tasks by categories</li>
                  <li>Track completed items</li>
                  <li>Data persistence across sessions</li>
               </ul>
            </section>
         </main>
         <footer className="home-footer">
            <p>Version 0.2</p>
            <p>Built with ❤️ by tinodev</p>
         </footer>
      </div>
   );
}

export default Home;

