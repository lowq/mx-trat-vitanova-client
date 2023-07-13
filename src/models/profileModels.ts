import { AvatarFullConfig } from "react-nice-avatar";

export interface Moto {
    brand: string
    model: string
    year: number
}

export interface User {
    name: string;
    isLoggedIn: boolean;
    token: string;
    avatarConfig: AvatarFullConfig;
    role: string;
    userInfo: UserInfo;
    login: (jwtToken: string, name: string, avatarConfig: AvatarFullConfig, role: string) => void;
    logout: () => void;
    setUserInfo: (UserInfo: UserInfo) => void;
}

export interface UserInfo {
    id: number
    age: number
    category: string
    moto: Moto
}

