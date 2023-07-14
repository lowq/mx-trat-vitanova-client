import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserContext from "../../../constans/userContext";

interface Message {
    id: number;
    email: string;
    subject: string;
    message: string;
}

const Kontakt = () => {

    const [email, setemail] = useState("");
    const [subject, setsubject] = useState("")
    const [message, setmessage] = useState("")
    const [messages, setmessages] = useState<Message[]>([])
    const [showBadEmail, setShowBadEmail] = useState<boolean>(false);

    const handleSendMessage = (e: any) => {
        e.preventDefault();

        if (email === "") {
            toast.warning("Pre odoslanie zadaj email")
            return
        }
        if (subject === "") {
            toast.warning("Pre odoslanie zadaj predmet")
            return
        }

        if (message === "") {
            toast.warning("Pre odoslanie napíš správu")
            return
        }

        const formData = new FormData;
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("message", message);

        try {
            axios
              .post(`${import.meta.env.VITE_BACKEND_URL}/kontakt/save`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                if (response.status === 200) {
                  clearData();
                }
              });
          } catch (error: any) {
            toast.warning(error.message);
          }
    }

    const clearData = () => {
        setemail("");
        setsubject("");
        setmessage("")
    }

    useEffect(() => {
      if (userContext.role === "ADMIN")
        {
            fetchMessages()
        }
    }, [])

    const fetchMessages = () => {
        axios
              .get(`${import.meta.env.VITE_BACKEND_URL}/kontakt/`, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${userContext.token}`
                },
              })
              .then((response) => {
                if (response.status === 200 && response.data.status === true) {
                    setmessages(response.data.data)
                }
        });
    }

    const handleSetRead = (id: number) => {
        axios
              .get(`${import.meta.env.VITE_BACKEND_URL}/kontakt/setRead/${id}`, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${userContext.token}`
                },
              })
              .then((response) => {
                if (response.status === 200 && response.data.status === true) {
                    toast.done("Prečítané")
                    fetchMessages()
                }
              });
    }

    const ValidateEmail = (email: string): boolean => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
      };   
      
      useEffect(() => {
        if (email === "") {
          setShowBadEmail(false);
        } else {
          if (ValidateEmail(email)) {
            setShowBadEmail(false);
          } else {
            setShowBadEmail(true);
          }
        }
      }, [email]);

    const userContext = useContext(UserContext);

  return (
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        {userContext.role === "ADMIN" ? (
        <>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Predmet</th>
                    <th>Správa</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                {messages && messages.map((messageLocal, id) => (
                    <tr key={id}>
                        <th>{messageLocal.email}</th>
                        <td>{messageLocal.subject}</td>
                        <td>{messageLocal.message}</td>
                        <td><button onClick={() => handleSetRead(messageLocal.id)}>Prečítať</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            
        </>
        ) : (
            <>
            <p className="mb-8 lg:mb-16 font-light text-center text-primary-content sm:text-xl">Pokiaľ máš nejaké otázky, nápady a podobne, neváhaj nás kontaktovať.</p>
            <form action="#" className="space-y-8">
                <div>
                    <label className="block mb-2 text-md font-medium text-primary-content ">Tvôj email</label>
                    {showBadEmail && (<p className="text-error mb-4">Zle zadaný email</p>)}
                    <input value={email} type="email" id="email" className="block p-2.5 w-full text-sm rounded-lg bg-base-300 text-neutral-focus placeholder:text-neutral" placeholder="name@flowbite.com" required onChange={(e) => setemail(e.target.value)}/>
                </div>
                <div>
                    <label className="block mb-2 text-md font-medium text-primary-content ">Predmet</label>
                    <input value={subject} type="text" id="subject" className="block p-2.5 w-full text-sm rounded-lg bg-base-300 text-neutral-focus placeholder:text-neutral" placeholder="Let us know how we can help you" required onChange={(e) => setsubject(e.target.value)}/>
                </div>
                <div className="sm:col-span-2">
                    <label className="block mb-2 text-md font-medium text-primary-content ">Tvoja správa</label>
                    <textarea value={message} id="message" className="block p-2.5 w-full text-sm rounded-lg bg-base-300 text-neutral-focus placeholder:text-neutral" placeholder="Leave a comment..." onChange={(e) => setmessage(e.target.value)}/>
                </div>
                <button type="submit" className="mx-4 btn border-primary-content text-primary-content" onClick={handleSendMessage}>Pošli správu</button>
            </form>
            </>
        )}
        
    </div>
  )
}

export default Kontakt