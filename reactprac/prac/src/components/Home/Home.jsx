import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import Header from "../Header";
import "./Home.css";
import Footer from "../Footer/Footer";

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
            <section className="about">
               <h3>about this site</h3>
               <p>This is a simple todo app built with React and Supabase. <br />
                  It's a fullstack web app that allows users to create, read, update, and delete todos. <br />
                  It uses Supabase for user authentication and data storage. <br />
                  I'm still learning (self-taught) how to be a fullstack dev, it's not great, but it's a start! <br />
                  Check out the code on <a href="https://github.com/tino-sv/react-website" target="_blank" rel="noreferrer">GitHub</a>
               </p>
            </section>
         </main>
        <Footer />    
      </div>
   );
}

export default Home;

