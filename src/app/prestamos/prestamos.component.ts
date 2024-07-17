import { PrestamoService } from './../services/prestamo.service';
import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { LibrosService } from '../services/libros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.scss']
})
export class PrestamosComponent {
  constructor(private usuarioService: UsuariosService, 
    private prestamoService: PrestamoService, private libroService: LibrosService){

  }

  lstPrestamos: any[] = []
  lstLibros: any[] = []

  ngOnInit(){
    this.getPrestamos();
  }

  getPrestamos(){
    this.prestamoService.get().subscribe(
      res =>{
        console.log(res);
        this.lstPrestamos = res;
      }
    )
  }

  recibir(id: number){
    this.prestamoService.edit(id).subscribe(
      res=>{
        console.log(res);
        Swal.fire({
          title: res.message,
          text: "De clic para continuar",
          icon: "success"
        });
      }
    )
  }

}
