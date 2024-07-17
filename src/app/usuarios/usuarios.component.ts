import { Component, inject, TemplateRef } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../models/usuarios.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  constructor(private service: UsuariosService, private fb: FormBuilder){
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  lstUsuarios: UserModel[] = [];
  lstPerfiles: any[] = [];
  filterUsuario: any[] = [];
  usuarios: UserModel[] = [];
  searchForm: FormGroup;
  private modalService = inject(NgbModal);
  closeResult = '';

  nombre: string ="";
  nombreU: string="";
  pass: string="";
  perfil: number=0;
  activo: number = 0;

  ngOnInit():void{
    this.getUsuarios();
    this.getPerfil();

    this.searchForm.get('search')?.valueChanges.subscribe(value =>{
      this.filterUsuarios(value);
    });
  }

  filterUsuarios(search: string){
    if(search){
      this.filterUsuario = this.usuarios.filter(user =>
        user.nombre.toLowerCase().includes(search.toLowerCase()) ||
        user.perfil.toLowerCase().includes(search.toLowerCase()) ||
        user.user.toLowerCase().includes(search.toLowerCase()) 
      );
    }
    else{
      this.filterUsuario = this.usuarios;
    }
  }

  getUsuarios(){
    this.service.get().subscribe(
      res =>{
        this.lstUsuarios = res;
        this.filterUsuario = res;
        this.usuarios = res;
      }
    )
  }

  getPerfil(){
    this.service.perfil().subscribe(
      res =>{
        this.lstPerfiles = res;
        console.log(this.lstPerfiles)
      }
    )
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

  postUsuario(){
    this.service.register(this.nombre, this.nombreU, this.pass, this.activo, this.perfil).subscribe(
      res =>{
        console.log(res);
        Swal.fire({
          title: res.message,
          text: "De clic para continuar",
          icon: "success"
        });
        this.nombre ="";
        this.nombreU = "";
        this.pass =""
        this.activo=1;
        this.perfil = 0;
      }
    )
  }
}
