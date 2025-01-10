import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function GoBlog() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
        <main className="flex-1 max-w-4xl mx-auto p-4">
          <h1 className="text-4xl mb-8 text-teal-400">Golang is cool</h1>
          <p className="mb-8">Last year, I was burnt out building my incredibly simple html questionaire website. I wanted to try things on the backend, but was scared if I'm being honest. I'm not a good programmer, and was even worse at that point in time. C was off limits, as I felt like I wasn't ready for it. Rust looked too hard. Zig is new, but other than <a href="https://ghostty.org" target="_blank" rel="noopener noreferrer" className="text-teal-400">Ghostty</a>, I hadn't heard much noise around it. The Primeagen was (and still is) very pro Golang, and as a viewer, I was intrigued. It seemed simple, with clean syntax, which is a huge plus for me. I decided to begin to dive into the language. </p>
          <br/>
          <p className='mb-8'>I started with the <a href="https://github.com/practical-tutorials/project-based-learning" target="_blank" rel="noopener noreferrer" className="text-teal-400">Project-Based-Learning</a> guide, and followed along with a few projects, mainly the chat app. This project even had a bit of frontend, which was my first exposure to React, and the world of frameworks. I'm not gonna lie, it was <strong>hard</strong>. I had to learn a lot of new things, and I was frustrated. But, I was able to do it. I was able to build a chat app, and it was cool. Seeing how both sides of development worked together on a project was cool. </p>
          <br/>
          <p className='mb-8'> I've been on a frontend kick lately, so Go has been on the backburner. But, now the world of javascript is a bit tedious, so I'm probably gonna run away, and go back to simplicity of Go. I love the terminal, so maybe building a CLI using Go would be fun. Guess we'll see. </p>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default GoBlog;