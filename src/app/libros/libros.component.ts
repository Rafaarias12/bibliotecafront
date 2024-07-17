import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrestamoService } from '../services/prestamo.service';
import { LibrosState } from './store/libros.state';
import { Store } from '@ngrx/store';
import { LibrosModel } from '../models/libros.model';
import { Observable } from 'rxjs';
import { filterLibros, loadLibros } from './store/libros.actions';
import { LibrosService } from '../services/libros.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss']
})
export class LibrosComponent implements OnInit{

  libros$: Observable<LibrosModel[]>;
  private modalService = inject(NgbModal);
	closeResult = '';
  lstAutor: any[] = [];
  lstCategoria: any[] = [];
  title: string ="";
  autor: number = 0;
  description: string ="";
  categoria: number =0;
  dateVariable: Date = NaN as unknown as Date;
  

  constructor(
    private store: Store<{ libros: LibrosState }>,
    private service: LibrosService
  ){
    this.libros$ = this.store.select(state => state.libros.filteredLibros);
  }

  ngOnInit():void{
    this.store.dispatch(loadLibros());
    this.onAutor();
    this.onCategoria();
  }

  onAutor(){
    this.service.getAutor().subscribe(
      res=>{
        this.lstAutor = res;
        console.log(res);
      }
    )
  }

  onCategoria(){
    this.service.getCategorias().subscribe(
      res =>{
        this.lstCategoria = res;
        console.log(res);
      }
    )
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      const searchTerm = input.value;
      this.store.dispatch(filterLibros({ searchTerm }));
    }
  }

  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  postLibros(){
    this.service.post(this.autor, this.title, this.description, "", "", this.dateVariable, this.dateVariable, this.categoria).
    subscribe(
      res =>{
        Swal.fire({
          title: res.message,
          text: "De clic para continuar",
          icon: "success"
        });
      }
    )

  }

  delete(id: number){
    this.service.delete(id).subscribe(
      res =>{
        Swal.fire({
          title: res.message,
          text: "De clic para continuar",
          icon: "success"
        });
        console.log(res)
      }
    )
  }

  getDescripcion(desc: string){
    Swal.fire(desc);
  }

}
