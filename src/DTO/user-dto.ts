export interface UserDTO {
    id: number;
    fullname: string;
    username: string;
    bio: string;
}

export interface UpdateUserDTO {
    id: number;
    fullname?: string;
    username?: string;
    bio?: string;
}