export interface User {
    name: String;
    email: String;
    phone: String;
    status: string;
    created_at: string,
    updated_at: string
}

export type LoginRequest = Pick<User,'email'> & {
    password: string;
}

