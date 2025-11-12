import { User} from '@services/users/user.interface'

export type LoginRequest = Pick<User,'email'> & {
    password: string;
}

export interface LoginResponse {
    user: User;
    access_token: string;
}