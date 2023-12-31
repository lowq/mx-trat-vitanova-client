import { useContext, useEffect, useState } from 'react'
import { Podujatie, User } from '../../../models/podujatia'
import UserContext from '../../../constans/userContext';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

interface ModalProps {
    podujatie: Podujatie
    isOpen: boolean;
    onClose: (good: boolean) => void;
}

const PodujatieInfo: React.FC<ModalProps> = ({ isOpen, onClose, podujatie}) => {
    const [cookies] = useCookies(["token"]);
    const [joined, setjoined] = useState<boolean>(false)

    const [podujatieLocal, setPodujatieLocal] = useState<Podujatie>(podujatie)

    const [joinedUsers, setjoinedUsers] = useState<User[]>([])

    useEffect(() => {
        const bool: boolean = podujatie.users.some((user) => user.name === userContext.name);
        setjoined(bool);
        setPodujatieLocal(podujatie);
        if(podujatie.users) {
            setjoinedUsers(podujatie.users)
        } else {
            setjoinedUsers([])
        }
    }, [podujatie]);

    const fetchPodujatieInfo = () => {
        axios
              .get(`${import.meta.env.VITE_BACKEND_URL}/podujatia/${podujatieLocal.id}`, {
                headers: {
                  Authorization: `Bearer ${cookies.token}`,
                },
              })
              .then((response) => {
                if (response.status === 200 && response.data.status === true) {
                    setPodujatieLocal(response.data.data)
                    if(response.data.data.users) {
                        setjoinedUsers(response.data.data.users)
                    } else {
                        setjoinedUsers([])
                    }
                }
              });
    }
    

    const userContext = useContext(UserContext);

    const joinPodujatie = () => {
        if(!userContext.userInfo ){
            toast.warning("Nemáš vyplnené info v profile klikni na ikonku hore");
            return
        }
        if(!userContext.userInfo?.moto){
            toast.warning("Nemáš nastavenú motorku v profile klikni na ikonku hore");
            return
        }
        try {
            axios
              .get(`${import.meta.env.VITE_BACKEND_URL}/podujatia/join/${podujatieLocal.id}`, {
                headers: {
                  Authorization: `Bearer ${cookies.token}`,
                },
              })
              .then((response) => {
                if (response.status === 200) {
                    toast.success("Úspešné prihlásenie na podujatie");
                    setjoined(true)
                    fetchPodujatieInfo()
                }
              });
          } catch (error) {
            toast.warning("Nepodarilo sa");
          }
    }

    const leftPodujatie = () => {
        try {
            axios
              .get(`${import.meta.env.VITE_BACKEND_URL}/podujatia/left/${podujatieLocal.id}`, {
                headers: {
                  Authorization: `Bearer ${cookies.token}`,
                },
              })
              .then((response) => {
                if (response.status === 200) {
                    toast.success("Úspešné odhlásenie z podujatia");
                    fetchPodujatieInfo()
                    setjoined(false)
                }
              });
          } catch (error) {
            toast.warning("Nepodarilo sa");
          }
    }

  return (
    <>
        <input
            checked={isOpen}
            type="checkbox"
            id="modalOpen"
            className="modal-toggle"
            readOnly
        />
        <div
            className={`modal fixed left-0 top-0 flex h-full w-full items-center justify-center`}
        >
            <div className="modal-box z-50 mx-auto w-11/12 overflow-y-auto rounded bg-neutral shadow-lg md:max-w-md">
            <div className="modal-content px-6 py-4 text-left text-primary">
                <div className='text-xl text-center m-4 text-primary-content shadow-lg py-2 my-4'>
                    <h1>Názov podujatia: {podujatieLocal.name}</h1>
                    <h1>Kapacita: {joinedUsers ? (joinedUsers.length) : (0) }/{podujatieLocal.maxCapacity}</h1>
                </div>

                <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th className='text-xl'>Meno</th>
                        <th className='text-xl'>Motorka</th>
                    </tr>
                    </thead>
                    <tbody>
                        {joinedUsers && joinedUsers.map((user, id) => {return(
                        <tr key={id}>
                            <th className='text-primary-content'>{user.name}</th>
                            <td className='text-primary-content'>{user.email}</td>
                    </tr>)})}
                    
                    </tbody>
                </table>
                </div>

                <div className='flex my-4'>
                   {userContext.isLoggedIn ? (
                    <div>
                        {joined ? (
                            <button className='btn border border-primary-content text-primary-content' onClick={leftPodujatie}>Odhlásiť sa</button>
                        ) : (
                            <button className='btn border border-primary-content text-primary-content' onClick={joinPodujatie}>Prihlásiť sa</button>
                            )}
                        
                    </div>
                   
                   ) : (
                    <div>
                        <h1 className='text-primary-content'>
                            Pre príhlásenie do preteku
                            
                        </h1>
                        <h1 className="text-primary-content">
                            sa prihlás alebo zaregistruj
                        </h1>
                    </div>
                   )}
                    
                <div className="grow"></div>
                <button onClick={() => onClose(true)} className='btn border border-primary-content text-primary-content'>Close</button>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default PodujatieInfo