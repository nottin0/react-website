import React from "react"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

interface BlogLayoutProps {
   title: string
   children: React.ReactNode 
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ title, children }) => {
   return (
      <>
         <Header />
         <div className="min-h-screen flex flex-col">
            <main className="flex-1 max-w-4xl mx-auto home p-4">
               <h1 className="text-4xl text-teal-400 font-bold mb-8">
                  {title}
               </h1>
               {children}
            </main>
            <Footer />
         </div>
      </>       
   );
};

export default BlogLayout;