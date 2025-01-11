import React from "react"
import BlogLayout from "./BlogLayout"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

function AI({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean; toggleDarkMode: () => void }) {
   return (
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-teal-100' : 'bg-white text-gray-900'}`}>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 max-w-4xl mx-auto p-4">
          <h1 className={`text-4xl ${isDarkMode ? 'text-teal-100' : 'text-gray-900'}`}>AI</h1>
          <br />
          <p className="mb-8">
          </p>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
   )
}

export default AI;