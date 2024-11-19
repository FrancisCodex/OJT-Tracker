import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const PublicLayout = ({ children }) => {
  return (
    <div className="">
        <Navbar />
      <main className="">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default PublicLayout;