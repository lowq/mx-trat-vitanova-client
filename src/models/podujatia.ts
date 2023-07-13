export interface Podujatie {
    id: number;
    name: string;
    date: Date;
    maxCapacity: number;
    users: User[]
}

export interface User {
    name: string;
    email: string;
}

