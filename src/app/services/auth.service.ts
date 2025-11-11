import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { enviornment } from "@src/environments/environments";
import { LoginRequest } from "./users/user.interface";

@Injectable({
    providedIn:'root'
})
export class AuthService {
    private http = inject(HttpClient);

    private baseUrl = enviornment.apiUrl;

    login(user: LoginRequest) {
        return this.http.post(`${this.baseUrl}/auth/login`, user)
    }


}