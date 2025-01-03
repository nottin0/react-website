import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Blog() {
return (
   <><Header /><div className='home p-4'>
      <h1 className='text-2xl font-bold text-teal-400'>Blog</h1>
      <h3 className='text-teal-400'>
         <Link to='/blog/go'>My Journey Learning Go</Link>
      </h3>
   </div>
   <Footer/></>
)
}

export default Blog;