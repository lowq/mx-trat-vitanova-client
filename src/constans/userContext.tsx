import React, {createContext, useState} from 'react'
import { AvatarFullConfig } from 'react-nice-avatar'
import { useCookies } from "react-cookie";
import { User, UserInfo } from '../models/profileModels';


const UserContext = createContext<User>({} as User)

export const UserContextProvider: React.FC<{ children: JSX.Element }> = (props) => {

    const [, setCookie, removeCookie] = useCookies(["token"]);

    const [name, setName] = useState<string>("")
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [token, setToken] = useState<string>("")
    const [role, setRole] = useState<string>("USER")
    const [avatarConfig, setAvatarConfig] = useState<AvatarFullConfig>({})
    const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo)    

    const loginHandler = (token: string, name: string, avatarConfig: AvatarFullConfig, role: string) => {
        setCookie("token", token, {
            sameSite: true,
        });
        setName(name);
        setToken(token);
        setAvatarConfig(avatarConfig);
        setIsLoggedIn(true);
        setRole(role);
    }

    const logoutHandler = () => {
        setName("");
        setToken("");
        setIsLoggedIn(false);
        setRole("");
        removeCookie("token")
    }

    return (
        <UserContext.Provider 
        value= {{
            name: name,
            isLoggedIn: isLoggedIn,
            token: token,
            avatarConfig: avatarConfig,
            role: role,
            userInfo: userInfo,
            login: loginHandler,
            logout: logoutHandler,
            setUserInfo: setUserInfo
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;