import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private service: UsuariosService, private router: Router,
    private fb: FormBuilder
  ){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    
    const lst = this.loginForm.value;
    let usuario = lst.email?.toString();
    let pass = lst.password?.toString();

    this.service.login(usuario, pass).subscribe(
      (res) =>{
        localStorage.setItem('token', res.msg);
        localStorage.setItem('perfil', res.perfil);
        localStorage.setItem('user', res.usuario)
        this.router.navigateByUrl('/in')
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error
        });
      }
    )
    
  }
}
