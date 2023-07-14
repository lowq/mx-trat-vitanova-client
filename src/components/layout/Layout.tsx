import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    children: React.ReactNode;
  }

interface dayTimeTraining {
  day: string;
  time: string;
}

const Layout = (props: Props) => {

  const [isMobile, setIsMobile] = useState(false);

  const daysForTraining: dayTimeTraining[] = [
    {day: "Streda", time: "12:00 - 19:00"},
    {day: "Piatok", time: "12:00 - 19:00"},
    {day: "Sobota", time: "9:00 - 19:00"},
    {day: "Nedela", time: "9:00 - 18:00"},
  ]

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Change the width as per your requirement
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on component mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const trainingTable = (
      <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr className='text-primary-content text-xl'>
                  <th>Deň</th>
                  <th>Čas</th>
                </tr>
              </thead>
              <tbody>
                {daysForTraining.map((train, id) => (
                  <tr key={id}>
                    <th>{train.day}</th>
                    <td>{train.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
  )

  
  return (
    <>
      <Navbar/>
      <main className="">
        {isMobile ? (<div className='mx-10 my-4'>
          <h1 className='text-center text-primary-content text-xl'>Trenigový čas</h1>
          {trainingTable}
        </div>) : (<aside className="fixed left-0 top-25 mx-10 my-4 border-neutral border-opacity-30 rounded-md border-2">
          <h1 className='text-center text-primary-content text-xl'>Trenigový čas</h1>
          {trainingTable}
        </aside>)}
        {props.children}
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