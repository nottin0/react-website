import React from "react";

function Footer({ isDarkMode }: { isDarkMode: boolean }) {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className={`text-center py-8 mt-auto ${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-800'}`}>
      <p>Version 0.5</p>
      <p>Built with ❤️ by tinodev</p>
      <p>Copyright {year} tinodev</p>
    </footer>
  );
}

export default Footer;
