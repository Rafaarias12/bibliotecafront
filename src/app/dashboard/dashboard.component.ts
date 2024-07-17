import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private admin: UsuariosService){
    
  }

  
  ngOnInit(){
    
  }

  perfiUser(){
    const perfil = this.admin.perfilUsuario();
    return perfil;
  }


}
