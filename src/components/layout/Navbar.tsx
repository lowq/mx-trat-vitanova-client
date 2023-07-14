import { useContext, useEffect, useRef, useState } from "react";
import Login from "./Login";
import UserContext from "../../constans/userContext";
import Avatar from 'react-nice-avatar'
import Profile from "./profile/Profile";
import { Link as SLink } from 'react-scroll';
import { Link as RLink } from "react-router-dom";
import axios from "axios";

interface menuItem {
    name: string;
    url: string;
}

const Navbar = () => {
  const targetDivRef = useRef<HTMLDivElement>(null);
  const [messageCount, setmessageCount] = useState(0)

  const handleScrollToDiv = () => {
    if (targetDivRef.current) {
      const navbarHeight = 25;
      const targetOffsetTop = targetDivRef.current.offsetTop + navbarHeight;

      window.scrollTo({
        top: targetOffsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseWheel = (event: WheelEvent) => {
    event.preventDefault();
  
    const scrollContainer = document.documentElement;
    const scrollOffset = event.deltaY > 0 ? window.innerHeight : -window.innerHeight;
  
    scrollContainer.scrollBy({
      top: scrollOffset,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    fetchCount()

    document.addEventListener('wheel', handleMouseWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleMouseWheel);
    };
  }, []);
    
  const fetchCount = () => {
    if(userContext.role === 'ADMIN') {
      axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/kontakt/count`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userContext.token}`
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.status === true) {
            setmessageCount(response.data.data)
        }
      });
    }
  }

    const userContext = useContext(UserContext);
    
    const menus: menuItem[] = [
        { name: "Podujatia", url: "Podujatia"},
        { name: "Foto", url: "Foto" },
        { name: "Kontakt", url: "Kontakt"}
    ];

      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isProfileOpen, setIsProfileOpen] = useState(false);
    
      const openModal = () => {
        setIsModalOpen(true);
        const element = document.getElementById('mainPage');
        if (element) {
          element.classList.add('opacity-30');
        }
      };

      const openProfile = () => {
        setIsProfileOpen(true);
        const element = document.getElementById('mainPage');
        if (element) {
          element.classList.add('opacity-30');
        }
      };

    
      const closeModal = (good: boolean) => {
        if (good) {
            setIsModalOpen(false);
        } else {
            setIsModalOpen(false);
        }
        const element = document.getElementById('mainPage');
        if (element) {
          element.classList.remove('opacity-30');
        }
      };

      const closeProfile = (good: boolean) => {
        if (good) {
          setIsProfileOpen(false);
        } else {
          setIsProfileOpen(false);
        }
        const element = document.getElementById('mainPage');
        if (element) {
          element.classList.remove('opacity-30');
        }
      };
     

  return (
    <>
      <header className="rounded-sm border-b border-primary-content bg-neutral text-justify font-mono">
        <div className="md:mx-80 mx-10 flex content-center text-lg" >
          <ul className="hidden content-center p-5 md:flex">
            <li key="0" className="p-2">
            <RLink className="rounded-box mx-2 bg-accent p-2 text-primary-content hover:bg-accent-focus"
                  to='/'> Domov </RLink>
            </li>
            {menus.map((menu, id) => (
              <li key={id} className="p-2">
                <SLink 
                  className="rounded-box mx-2 bg-accent p-2 text-primary-content hover:bg-accent-focus"
                  to={menu.url} smooth={true} duration={500} onClick={handleScrollToDiv}
                >
                  {menu.name}
                </SLink>
              </li>
            ))}
            {userContext.role === 'ADMIN' && (<li key="99" className="p-2"><RLink className="rounded-box mx-2 bg-accent p-2 text-primary-content hover:bg-accent-focus"
                  to='/admin'> Admin </RLink></li>)}
          </ul>
          <details className="dropdown m-5 flex content-center md:hidden">
            <summary className="rounded-box list-none bg-accent p-2 text-primary-content hover:bg-accent-focus">
              Menu
            </summary>
            <ul className="w-52w dropdown-content menu rounded-box z-[1] bg-neutral p-5 shadow-transparent">
              <li key="0" className="p-2">
              <RLink className="rounded-box mx-2 bg-accent p-2 text-primary-content hover:bg-accent-focus"
                    to='/'> Home </RLink>
              </li>
              {menus.map((menu, id) => (
                <li key={id} className="my-2">
                  <SLink
                    className="rounded-box bg-accent p-2 text-primary-content hover:bg-accent-focus"
                    to={menu.name} smooth={true} duration={500} onClick={handleScrollToDiv}
                  >
                    {menu.name}
                  </SLink>
                </li>
              ))}
              {userContext.role === 'ADMIN' && (<li key="99" className="p-2"><RLink className="rounded-box mx-2 bg-accent p-2 text-primary-content hover:bg-accent-focus"
                  to='/admin'> Admin </RLink></li>)}
            </ul>
          </details>
          <div className="grow"></div>
          <div className="p-5 content-center flex">
            {userContext.isLoggedIn ? (
              <>
              <div className="flex items-center">
              <div onClick={() => openProfile()}>
                <Avatar className="mx-4 w-12 h-12" {...userContext.avatarConfig} />
              </div>
              {/* <p className="mx-4">{userContext.name}</p> */}
            
            <div>  
                              <a
                  className="rounded-box h-9 bg-accent p-2 text-primary-content hover:bg-accent-focus"
                  onClick={() => {
                    userContext.logout()
                  }}
                >
                  Logout
                </a>
                </div>  
                </div>
                </>
            ) : (
                <div className="my-2">
                    <a
                  className="rounded-box h-9 bg-accent p-2 text-primary-content hover:bg-accent-focus"
                  onClick={() => {
                    //setLogin(!login);
                    openModal();
                  }}
                >
                  Login
                </a>
                </div>  
            )}
          </div>
        </div>
        {userContext.isLoggedIn ? (
          <Profile isOpen={isProfileOpen} onClose={closeProfile} />
        ) : (<Login isOpen={isModalOpen} onClose={closeModal} />)}

          {messageCount > 0 && (
            <h1 className="text-accent self-center text-center mb-2 text-xl">
              V kontakt máš {messageCount} neprečítaných správ ako admin!
            </h1>
          )}
      </header>
      
    </>
  );
};

export default Navbar;
