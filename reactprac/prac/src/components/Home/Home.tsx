import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Home({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean; toggleDarkMode: () => void }) {
   const { user } = useAuth() as { user: any };

   return (
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
         <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
         <main className="flex-1 max-w-4xl mx-auto p-4 text-center">
            <h1 className={`text-4xl mb-8 ${isDarkMode ? 'text-teal-100' : 'text-teal-400'}`}>Welcome to Todo App</h1>
            {!user ? (
               <div className={`bg-gray-800 p-8 rounded-lg shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  <p className={`${isDarkMode ? 'text-teal-100' : 'text-teal-400'}`}>Please log in or sign up to manage your todos</p>
                  <div className="flex gap-4 justify-center mt-4">
                     <Link
                        to="/login"
                        className="bg-teal-400 text-gray-900 px-6 py-3 rounded-lg font-bold transition-colors hover:bg-teal-300"
                     >
                        Login
                     </Link>
                     <Link
                        to="/signup"
                        className="bg-teal-400 text-gray-900 px-6 py-3 rounded-lg font-bold transition-colors hover:bg-teal-300"
                     >
                        Sign Up
                     </Link>
                  </div>
               </div>
            ) : (
               <div className={`bg-gray-800 p-8 rounded-lg shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  <h2 className={`text-3xl mb-4 ${isDarkMode ? 'text-teal-100' : 'text-teal-400'}`}>
                     yo, {user.user_metadata?.displayName}!
                  </h2>
                  <p className={`${isDarkMode ? 'text-teal-100' : 'text-teal-400'}`}>got stuff to do?</p>
                  <Link
                     to="/todos"
                     className={`bg-teal-400 text-gray-900 px-6 py-3 rounded-lg font-bold transition-colors hover:bg-teal-300 mt-4 inline-block ${isDarkMode ? 'bg-teal-600' : 'bg-teal-400'}`}
                  >
                     Go to My Todos
                  </Link>
               </div>
            )}
         </main>
         <Footer isDarkMode={isDarkMode} />
      </div>
   );
}

export default Home;
