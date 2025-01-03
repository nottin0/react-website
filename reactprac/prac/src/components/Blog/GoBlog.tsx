import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function GoBlog() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
        <main className="flex-1 max-w-4xl mx-auto p-4">
          <h1 className="text-4xl mb-8 text-teal-400">My Journey Learning Go: The First Steps into Programming</h1>
          <p className="mb-8">When I decided to learn programming, I was overwhelmed by the choices: Python, JavaScript, C++, and many more. After some research, I landed on Go (or Golang), a language known for its simplicity and efficiency. Here's what my journey looks like so far.</p>
          <h2 className="text-3xl mb-4 text-teal-400">Why I Chose Go</h2>
          <p className="mb-4">Go appealed to me because:</p>
          <ul className="list-disc ml-8 mb-8">
            <li className="mb-2">Simplicity: Its clean syntax makes it approachable for beginners.</li>
            <li className="mb-2">It's fast and powerful, often used for backend development.</li>
            <li className="mb-2">The Go community is welcoming, with lots of resources for learners.</li>
          </ul>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default GoBlog;