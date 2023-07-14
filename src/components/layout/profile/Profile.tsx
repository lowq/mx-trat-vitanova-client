import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../constans/userContext";
import Avatar from "react-nice-avatar";
import Moto from "./Moto";
import axios from "axios";
import UserInfo from "./UserInfo";
import Setup from "./Setup";
import Edit from "./Edit";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: (good: boolean) => void;
}

const Profile: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [setupProfile, setSetupProfile] = useState<boolean>(false);

  const userContext = useContext(UserContext);

  const [brands, setBrands] = useState<[]>([]);
  const [categories, setCategories] = useState<[]>([]);

  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/profile/brands`, {
          headers: {
            Authorization: `Bearer ${userContext.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200 && response.data.status === true) {
            setBrands(response.data.data);
          }
        });
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/profile/categories`, {
          headers: {
            Authorization: `Bearer ${userContext.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200 && response.data.status === true) {
            setCategories(response.data.data);
          }
        });
    } catch (error) {
      toast.warning("Nepodarilo sa");
    }
  }, []);

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
        <div className="modal-box z-50 mx-auto w-11/12 overflow-y-auto rounded bg-neutral shadow-lg md:max-w-md border border-primary-content">
          <div className="modal-content px-6 py-4 text-left text-primary">
          <div className="flex m-4 text-primary-content border border-primary-content py-2 my-4 items-center justify-center">
                  <h1 className="text-5xl text-center mx-4 ">
                    {userContext.name}
                  </h1>
                  <div className="border-primary-content rounded-full border-4">
                    <Avatar
                      className="w-24 h-24"
                      {...userContext.avatarConfig}
                    />
                  </div>
                </div>
            {!editProfile ? (
              !setupProfile ? (
              <>
                <UserInfo />
                <Moto />
                <div className="flex my-4">
                  {userContext.userInfo ? (
                  <button
                    onClick={() => setEditProfile(true)}
                    className="mx-4 btn border border-primary-content text-primary-content"
                  >
                    Edit
                  </button>
                  ) : (<button
                    onClick={() => setSetupProfile(true)}
                    className="mx-4 btn border border-primary-content text-primary-content"
                  >
                    Setup
                  </button>)}
                  
                  <div className="grow"></div>
                  <button
                    onClick={() => onClose(true)}
                    className="mx-4 btn border-primary-content text-primary-content"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <Setup brands={brands} categories={categories} isClose={setSetupProfile}/>
              </>
            )) : (<>
              <Edit brands={brands} categories={categories} isClose={setEditProfile}/>
            </>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
