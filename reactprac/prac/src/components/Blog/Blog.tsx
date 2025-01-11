import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Blog({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean; toggleDarkMode: () => void }) {
  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-1 max-w-4xl mx-auto p-4">
        <h1 className="text-4xl">Blog</h1>
        <h3 className={`text-teal-400 ${isDarkMode ? 'text-teal-400' : 'text-gray-900'}`}>
          <Link to='/blog/go'>golang is cool</Link>
        </h3>
        <h3 className={`text-teal-400 ${isDarkMode ? 'text-teal-400' : 'text-gray-900'}`}>
          <Link to='/blog/webdev'>web dev blows and i love it</Link>
        </h3>
         <h3 className={`text-teal-400 ${isDarkMode ? 'text-teal-400' : 'text-gray-900'}`}>
          <Link to='/blog/term'>ghostty and why you should even care about a terminal</Link>
        </h3>
        <h3 className={`text-teal-400 ${isDarkMode ? 'text-teal-400' : 'text-gray-900'}`}>
          <Link to='/blog/ai'>ai</Link>
        </h3>
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default Blog;