import React from "react";
import BlogLayout from "./BlogLayout";
import ghostty from "../../assets/ghostty-ff.png";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function TermBlog({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean; toggleDarkMode: () => void }) {
  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-teal-100' : 'bg-white text-gray-900'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-1 max-w-4xl mx-auto p-4">
        <h1 className={`text-4xl ${isDarkMode ? 'text-teal-100' : 'text-gray-900'}`}>Ghostty and Why You Should Even Care About a Terminal</h1>
        <br />
        <p className={`mb-8 ${isDarkMode ? 'text-teal-100' : 'text-gray-900'}`}>
          Terminals are the most important tool you will use in your
          computing life, and you probably don't even care about it. If
        you're a Windows user, you might not even know what a terminal
        is. And if you do, you're using PowerShell. I've met plenty of
        macOS users who are perfectly fine using iTerm2 or even the{" "}
        <a
          href="https://x.com/theo/status/1730056992432308329"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-teal-400 ${isDarkMode ? 'text-teal-100' : 'text-gray-900'}`}
        >
          default Mac terminal
        </a>{" "}
        (as bad as it is). And of course, those on Linux love to fight
        over Kitty vs Alacritty. So, why even create a terminal? And
        why should I care about this one?
      </p>
      <p className={`mb-8 ${isDarkMode ? 'text-teal-100' : 'text-gray-900'}`}>
        you'd think that something as simple as a terminal emulator
        wouldn't inspire such hype. what makes ghostty so special? Is
        it the{" "}
        <a
          href="https://mitchellh.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-teal-400 ${isDarkMode ? 'text-teal-100' : 'text-gray-900'}`}
        >
          dev
        </a>{" "}
        that has quite the resume? Maybe its the language it's written
        in, Zig, that has been getting a lot of hype lately? Maybe
        it's the fact that before its public release, you{" "}
        <i className="font-bold">needed</i> an invite to the beta via
        the discord? Honestly, it's a mix of all of those things, but
        its{" "}
        <a
          href="https://x.com/mitchellh/status/1871663119187280293"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-teal-400 ${isDarkMode ? 'text-teal-100' : 'text-gray-900'}`}
        >
          speed
        </a>{" "}
        and native feel is what can make ghostty feel better. If
        you're on Mac, it'll feel like a mac app. On linux, it'll feel
        like a GNOME app(if you're chill with that), though you can
        customize it so it fits in better with your distro. It's
        simple to config. There's no new language to learn, just a
        simple text file and plenty of options.{" "}
      </p>
      <img
        src={ghostty}
        alt="my personal ghostty config"
        className={`mb-8 ${isDarkMode ? 'text-teal-100' : 'text-gray-900'}`}
        style={{ width: "50%", display: "block", margin: "0 auto" }}
      />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default TermBlog;
