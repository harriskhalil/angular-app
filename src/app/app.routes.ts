import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout.component';
import { Home } from './pages/home/home.component';
import { AuthLayout } from './layouts/auth/auth-layout.component';
import { Login } from './pages/auth/login.component';

export const routes: Routes = [
    {
        path:'',
        component: MainLayout,
        children:[
            {
                path:'',
                component: Home
            }
        ]
    },
    {
        path:"auth",
        component: AuthLayout,
        children:[
            {
                path:'login',
                component: Login
            }
        ]
    }
];
