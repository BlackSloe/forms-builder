import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormBuilderComponent } from './_feature/form-builder/form-builder/form-builder.component';
import { LoginComponent } from './_core/authorisation/login/login.component';
import { SignupComponent } from './_core/authorisation/signup/signup.component';
import { AuthenticationGuard } from './_helpers/authentication.guard';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: 'homepage',
        component: FormBuilderComponent,
        loadChildren: () => import('./_feature/form-builder/form-builder.module').then(m => m.FormBuilderModule),
        canActivate: [AuthenticationGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
