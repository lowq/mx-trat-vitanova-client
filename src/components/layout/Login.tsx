import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../constans/userContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import { genConfig, AvatarFullConfig } from "react-nice-avatar";

interface ModalProps {
  isOpen: boolean;
  onClose: (good: boolean) => void;
}

const ValidateEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<boolean>(true);
  const [loginName, setLoginName] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [registerName, setRegisterName] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerPasswordRepeat, setRegisterPasswordRepeat] =
    useState<string>("");

  const [showBadPassword, setShowBadPassword] = useState<boolean>(false);
  const [showBadEmail, setShowBadEmail] = useState<boolean>(false);

  const handleTabChange = () => {
    setActiveTab(!activeTab);
  };

  const resetData = () => {
    setActiveTab(true);
    setLoginName("");
    setLoginPassword("");
    setRegisterName("");
    setRegisterPassword("");
    setRegisterEmail("");
    setRegisterPasswordRepeat("");
  };

  const userContext = useContext(UserContext);

  const handleLogin = async () => {
    await axios
      .post(
        "${import.meta.env.VITE_BACKEND_URL}/auth/login",
        {
          name: loginName,
          passwordHash: loginPassword,
        },
        {
          headers: {
            "Content-type": "application/json; charset=utf-8",
          },
        }
      )
      .then((response) => {
        if (response.status === 200 && response.data.status === true) {
          const decoded: any = jwt_decode(response.data.data);
          const avatarConfig: AvatarFullConfig = genConfig(decoded.email);
          userContext.login(
            response.data.data,
            loginName,
            avatarConfig,
            decoded.role
          );
          axios
            .get(
              `${import.meta.env.VITE_BACKEND_URL}/profile/userInfo/${decoded.name}/${decoded.email}`,
              {
                headers: {
                  "Content-type": "application/json; charset=utf-8",
                  Authorization: `Bearer ${response.data.data}`,
                },
              }
            )
            .then((response) => {
              if (response.status === 200 && response.data.status === true) {
                userContext.setUserInfo(response.data.data);
              }
            });
          onClose(true);
          resetData();
          toast.success("Login success");
        } else {
          toast.warning(response.data.data);
        }
      });
  };

  const handleRegister = async () => {
    if (
      registerPassword === registerPasswordRepeat &&
      ValidateEmail(registerEmail)
    ) {
      await axios
        .post(
          "${import.meta.env.VITE_BACKEND_URL}/auth/register",
          {
            email: registerEmail,
            name: registerName,
            passwordHash: registerPassword,
          },
          {
            headers: {
              "Content-type": "application/json; charset=utf-8",
            },
          }
        )
        .then((response) => {
          if (response.status === 200 && response.data.status === true) {
            const decoded: any = jwt_decode(response.data.data);
            const avatarConfig: AvatarFullConfig = genConfig(decoded.email);
            userContext.login(
              response.data.data,
              loginName,
              avatarConfig,
              decoded.role
            );
            onClose(true);
            resetData();
            toast.success("Register success");
          } else {
            toast.warning(response.data.data);
          }
        });
    } else {
      setShowBadPassword(true);
    }
  };

  useEffect(() => {
    if (registerPasswordRepeat === "") {
      setShowBadPassword(false);
    } else {
      if (registerPassword === registerPasswordRepeat) {
        setShowBadPassword(false);
      } else {
        setShowBadPassword(true);
      }
    }
  }, [registerPassword, registerPasswordRepeat]);

  useEffect(() => {
    if (registerEmail === "") {
      setShowBadEmail(false);
    } else {
      if (ValidateEmail(registerEmail)) {
        setShowBadEmail(false);
      } else {
        setShowBadEmail(true);
      }
    }
  }, [registerEmail]);

  return (
    <>
      <input
        checked={isOpen}
        type="checkbox"
        id="modalOpen"
        className="modal-toggle"
      />
      <div
        className={`modal fixed left-0 top-0 flex h-full w-full items-center justify-center`}
      >
        <div className="modal-box z-50 mx-auto w-11/12 overflow-y-auto rounded bg-neutral shadow-lg md:max-w-md">
          <div className="modal-content px-6 py-4 text-left text-primary">
            <ul className="flex">
              <li
                className={`-mb-px mr-1 ${
                  activeTab
                    ? "rounded-t border-l border-r border-t text-accent-content"
                    : ""
                }`}
              >
                <button
                  className="inline-block bg-neutral px-4 py-2 font-semibold focus:outline-none"
                  onClick={() => handleTabChange()}
                >
                  Login
                </button>
              </li>
              <li
                className={`-mb-px mr-1 ${
                  !activeTab
                    ? "rounded-t border-l border-r border-t text-accent-content"
                    : ""
                }`}
              >
                <button
                  className="inline-block bg-neutral px-4 py-2 font-semibold focus:outline-none"
                  onClick={() => handleTabChange()}
                >
                  Register
                </button>
              </li>
            </ul>

            {activeTab ? (
              <div className="text-primary">
                <label
                  htmlFor="login-email"
                  className="mb-2 block font-semibold text-primary-content"
                >
                  Name
                </label>
                <input
                  type="email"
                  id="login-email"
                  className="mb-3 w-full rounded border border-primary-focus bg-neutral-focus px-3 py-2 text-primary-content"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                />

                <label
                  htmlFor="login-password"
                  className="mb-2 block font-semibold text-primary-content"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  className="mb-3 w-full rounded border border-primary-focus bg-neutral-focus px-3 py-2 text-primary-content"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />

                <button
                  className="w-full rounded bg-primary
                px-4 py-2 font-bold text-accent-content hover:bg-primary-focus"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="text-primary">
                <label
                  htmlFor="register-name"
                  className="mb-2 block font-semibold text-primary-content"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="register-name"
                  className="mb-3 w-full rounded border border-primary-focus
                bg-neutral-focus px-3 py-2 text-primary-content"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                />

                <label
                  htmlFor="register-email"
                  className="mb-2 block font-semibold text-primary-content"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="register-email"
                  className="mb-3 w-full rounded border border-primary-focus
                bg-neutral-focus px-3 py-2 text-primary-content"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
                {showBadEmail && (
                  <p className="text-error mb-4">Zle zadaný mail</p>
                )}

                <label
                  htmlFor="register-password"
                  className="mb-2 block font-semibold text-primary-content"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="register-password"
                  className="mb-3 w-full rounded border border-primary-focus
                bg-neutral-focus px-3 py-2 text-primary-content"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />

                <label
                  htmlFor="register-password"
                  className="mb-2 block font-semibold text-primary-content"
                >
                  Repeat Password
                </label>
                <input
                  type="password"
                  id="register-password"
                  className="mb-3 w-full rounded border border-primary-focus
                bg-neutral-focus px-3 py-2 text-primary-content"
                  value={registerPasswordRepeat}
                  onChange={(e) => setRegisterPasswordRepeat(e.target.value)}
                />
                {showBadPassword && (
                  <p className="text-error mb-4">Heslá sa nezhodujú</p>
                )}
                <button
                  className="w-full rounded bg-primary
                px-4 py-2 font-bold text-white hover:bg-primary-focus                "
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            )}
            <div className="modal-action">
              <button
                className="btn rounded bg-primary
                px-4 py-2 font-bold text-white hover:bg-primary-focus "
                onClick={() => {
                  resetData(), onClose(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
