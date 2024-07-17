import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  url: string = 'http://localhost:5000/api/prestamos/';

  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(this.url, httpOption);
  }

  post(
    estado: number,
    usuario: number,
    fecha_init: Date,
    fecha_final: Date,
    libro: number
  ): Observable<any> {
    return this.http.post(this.url + 'add', {
      estado,
      usuario,
      fecha_init,
      fecha_final,
      libro,
    }, httpOption);
  }

  edit(id: number):Observable<any>{
    return this.http.put(this.url + id, httpOption);
  }

  getEstado():Observable<any>{
    return this.http.get(this.url + "estado", httpOption);
  }



}