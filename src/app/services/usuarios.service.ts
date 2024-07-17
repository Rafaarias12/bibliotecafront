import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = "http://localhost:5000/api/usuario/";

  constructor(private http: HttpClient) { }

  login(user: string, password: string): Observable<any>{
    return this.http.post(this.url +"login", {user, password}, httpOption);
  }

  register(nombre: string, user: string, password: string, activo: number, perfil: number): Observable<any>{
    return this.http.post(this.url + "register", {nombre, user, password, activo, perfil}, httpOption);
  }

  perfil(): Observable<any>{
    return this.http.get(this.url + "perfil", httpOption);
  }

  get(): Observable<any>{
    return this.http.get<any>(this.url, httpOption);
  }
  
  perfilUsuario(): string | null{
    const perfil = localStorage.getItem('perfil');
    return perfil
  }
}
