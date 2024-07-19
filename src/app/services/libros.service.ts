import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibrosModel } from '../models/libros.model';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  url: string = "http://localhost:5000/api/libros/";

  constructor(private http: HttpClient) { }

  getLibros(): Observable<LibrosModel[]>{
    return this.http.get<LibrosModel[]>(this.url , httpOption);
    
  }

  getCategorias():Observable<any>{
    return this.http.get(this.url + "/categoria", httpOption);
  }

  post(autor: number, titulo: string, descripcion: string, nombre: string, apellido: string, fechafinal: Date,
    fechanac: Date, categoria: number
  ): Observable<any>{
    return this.http.post(this.url, {
      autor, titulo,  descripcion, nombre, apellido, fechafinal,
      fechanac, categoria
    }, httpOption)
  }

  put(id: number, titulo: string, categoria: number, autor: number): Observable<any>{
    return this.http.put(this.url + id, { titulo, categoria, autor},httpOption);
  }

  delete(id: number):Observable<any>{
    return this.http.delete(this.url + id, httpOption);
  }

  getAutor():Observable<any>{
    return this.http.get(this.url + "autor", httpOption)
    
  }
}
