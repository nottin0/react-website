import React from "react";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="text-center py-8 bg-gray-900 mt-auto">
      <p className="text-gray-400">Version 0.5</p>
      <p className="text-gray-400">Built with ❤️ by tinodev</p>
      <p className="text-gray-400">Copyright {year} tinodev</p>
    </footer>
  )
}

export default Footer;
