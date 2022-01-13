import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoDetailsComponent } from './views/curso-details/curso-details.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UserComponent } from './views/user/user.component';

const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "details/:courseId",
        component: CursoDetailsComponent
    },
    {
        path: "user",
        children: [
            {
                path: "details/:userId",
                component: UserComponent,
            },
            {
                path: "register",
                component: UserComponent,
                data: {
                    isUserRegister: true
                }
            }
        ]
    },
    {
        path: "login",
        component: LoginComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
