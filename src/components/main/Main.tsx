import {useRef, useState, useEffect} from 'react'
import NewsList from './novinky/NewsList'
import { FaArrowUp } from 'react-icons/fa';
import PodujatiaTable from './podujatia/PodujatiaTable';
import Foto from './foto/Foto';
import Kontakt from './kontakt/Kontakt';


const Main = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowButton(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const targetDivRef = useRef<HTMLDivElement>(null);

  return (
    <>
        <div className="md:mx-80 mx-10 items-center" id='mainPage'>
            <div className="min-h-screen">
              <h1 className='text-center my-4 text-5xl font-medium leading-tight text-primary-content bg-neutral rounded-2xl py-2' >Novinky</h1>
              <NewsList/>
            </div>
            <div className="min-h-screen">
            <h1 className='text-center my-4 text-5xl font-medium leading-tight text-primary-content bg-neutral rounded-2xl py-2' ref={targetDivRef} id="Podujatia">Podujatia</h1>
            <PodujatiaTable/>
            </div>
            <div className="min-h-screen">
            <h1 className='text-center my-4 text-5xl font-medium leading-tight text-primary-content bg-neutral rounded-2xl py-2' ref={targetDivRef} id="Foto">Foto</h1>
            <Foto/>
            </div>
            <div className="min-h-screen">
            <h1 className='text-center my-4 text-5xl font-medium leading-tight text-primary-content bg-neutral rounded-2xl py-2' ref={targetDivRef} id="Kontakt">Kontakt</h1>
            <Kontakt/>
            </div>
            {showButton && (
              <button
              className="md:mr-64 mr-4 fixed right-4 bottom-4 z-50 p-2 bg-neutral text-primary-content rounded-full transition-opacity duration-300 animate-bounce"
              onClick={handleScrollToTop}
            >
              <FaArrowUp />
            </button>
            )}
        </div>
    </>
  )
}

export default Main