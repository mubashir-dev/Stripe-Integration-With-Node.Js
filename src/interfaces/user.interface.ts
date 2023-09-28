export interface IUser {
    name: string;
    email: string;
    password: string;
    salt: string;
    avatar?: string;
}