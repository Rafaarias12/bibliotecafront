import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { LibrosComponent } from './libros/libros.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  {path: 'in', component: DashboardComponent,
    children:[
      {path: '', component: PrestamosComponent, canActivate: [AuthGuard]},
      {path:'libros', component: LibrosComponent, canActivate: [AuthGuard]},
      {path:'usuarios', component:UsuariosComponent, canActivate: [AuthGuard]}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo:'/login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
