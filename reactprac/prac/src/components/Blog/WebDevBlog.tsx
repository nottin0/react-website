import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function WebDevBlog() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
        <main className="flex-1 max-w-4xl mx-auto p-4">
          <h1 className="text-4xl mb-8 text-teal-400">Web Dev blows and i love it</h1>
          <p className="mb-8">As a self-taught programmer, figuring out which 'lane' to go through has been challenging. Trying not to play with the new shiny language or <a href="https://www.youtube.com/watch?v=EEUiPjLY1c0" target="_blank" rel="noopener noreferrer" className="text-teal-400">framework</a> isn't easy, and I've hopped around a bit more than I'd like to admit. From Golang, to Python, to Javascript(typescript as well yuck), to even Rust(yeah i know). Seeing all of the discussion and arguments in the community around all of the options, I've come to the conclusion that web dev sucks. But i would be lying if i said i wasn't having fun.</p>
          <br/>
          <p className="mb-8">I spent a few weeks poking at Golang as my first "real" coding experience. Thanks to the great resource <a href="https://github.com/practical-tutorials/project-based-learning" target="_blank" rel="noopener noreferrer" className="text-teal-400">Project-Based-Learning</a>, I was able to follow along with a few projects and learn the basics. But i wanted to challenge myself to do something i felt was out of my depth. I decided to build my first interactive website. I started with a <a href="https://tino-sv.github.io" target="_blank" rel="noopener noreferrer" className="text-teal-400">questionaire page</a>, that used most of the basic form options as different question styles. It was built with vanilla html, javascript, and css. It was the hardest thing at that point as i basically went in blind. I knew HTML and CSS, but i had no idea how to add the javascript to make it functional.</p>
          <br/>
          <p className="mb-8">Day by day, i would learn more and more about javascript, and i began to understand why the language was seen as both a joke, and essential to understand. But, i wanted to learn more. This is where I began my journey into React. I started with a todo app (as we all do). AI and tutorials were my guide. Attempting to understand all of the modern and new concepts needed for the project, and what I wanted to achieve was difficult, but I was able to do it. </p>
          <br/>
          <p className="mb-8">It's been frustrating, but engaging. Of course, I still have much to learn, but web dev has shown me that, ultimately, most languages and frameworks <strong>suck</strong> according to someone. So, pick whatever you want, stick with it, and have fun.</p>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default WebDevBlog;