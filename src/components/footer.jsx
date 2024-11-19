import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background text-white py-4 border-t-2">
      <div className="container mx-auto text-center">
        <span className='text-black'>Made by <a
          href="https://github.com/FrancisCodex"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-primary"
        >
         FrancisCodex
        </a> with Love 💓</span>
      </div>
    </footer>
  );
};

export default Footer;