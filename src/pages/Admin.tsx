import { useContext, useState } from 'react'
import AddNovinka from '../components/admin/AddNovinka'
import UserContext from '../constans/userContext';
import AddPodujatie from '../components/admin/AddPodujatie';
import AddFoto from '../components/admin/AddFoto';

const Admin = () => {
  const userContext = useContext(UserContext);

  const [isModalAddNovinkaOpen, setIsModalAddNovinkaOpen] = useState(false);

  const openModalAddNovinka = () => {
    setIsModalAddNovinkaOpen(true);
  };

  const closeModalAddNovinka = (good: boolean) => {
    if (good) {
      setIsModalAddNovinkaOpen(false);
    } else {
      setIsModalAddNovinkaOpen(false);
    }
  };

  const [isModalAddPodujatieOpen, setIsModalAddPodujatieOpen] = useState(false);

  const openModalAddPodujatie = () => {
    setIsModalAddPodujatieOpen(true);
  };

  const closeModalAddPodujatie = (good: boolean) => {
    if (good) {
      setIsModalAddPodujatieOpen(false);
    } else {
      setIsModalAddPodujatieOpen(false);
    }
  };

  const [isModalAddFotoOpen, setIsModalAddFotoOpen] = useState(false);

  const openModalAddFoto = () => {
    setIsModalAddFotoOpen(true);
  };

  const closeModalAddFoto = (good: boolean) => {
    if (good) {
      setIsModalAddFotoOpen(false);
    } else {
      setIsModalAddFotoOpen(false);
    }
  };

  return (
    <>
    <div className="md:mx-80 mx-10 items-center">
            {
              userContext.role === "ADMIN" && (<>
                <div className="flex flex-col items-center">
                  <button className="btn my-4 text-primary-content bg-neutral border-primary-content text-4xl h-24" onClick={openModalAddNovinka}>Pridaj novinku</button>
                  <AddNovinka isOpen={isModalAddNovinkaOpen} onClose={closeModalAddNovinka} />
                </div>
                <div className="flex flex-col items-center">
                  <button className="btn my-4 text-primary-content bg-neutral border-primary-content text-4xl h-24" onClick={openModalAddPodujatie}>Pridaj podujatie</button>
                  <AddPodujatie isOpen={isModalAddPodujatieOpen} onClose={closeModalAddPodujatie} />
                </div>
                <div className="flex flex-col items-center">
                  <button className="btn my-4 text-primary-content bg-neutral border-primary-content text-4xl h-24" onClick={openModalAddFoto}>Pridaj fotku</button>
                  <AddFoto isOpen={isModalAddFotoOpen} onClose={closeModalAddFoto} />
                </div>
              </>)
            }
        </div>
      </>
  )
}

export default Admin