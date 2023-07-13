import React, { useState } from 'react'
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    children: React.ReactNode;
  }

const Layout = (props: Props) => {
  
  return (
    <>
      <Navbar/>
      <main className="">{props.children}
      <ToastContainer position="top-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="dark"/>
      </main>
    </>
  )
}

// bg-[url('../public/ariel-view-of-a-motocross-track_1024x1024.jpg')]

export default Layout