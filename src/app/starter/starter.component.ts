import { Professores } from '../domain/professores/professores';
import { Headers } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import {  FileUploader, } from 'ng2-file-upload/ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Noticias } from '../domain/noticias/noticias';
import { ToastrService } from 'ngx-toastr';
import { ProfessorService } from '../professor/service/professor.service';
import { NoticiasService } from "../noticias/service/noticias.service";
import { Usuarios } from '../domain/usuarios/usuarios';
import { RegistrarService } from '../registrar/service/registrar.service';
import { TokenStorageService } from '../login/service/token-storage.service';

@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements OnInit {

  isNoticia : boolean = true;
  isGabarito : boolean = true;

  formNoticia: FormGroup;
  noticia: Noticias = new Noticias();
  noticias: Noticias[];
  professores: Professores[];
  usuario: Usuarios = new Usuarios();
  usuarios: Usuarios[];


  constructor(

    formBuilder: FormBuilder,
    private toastr: ToastrService,
    private noticiaService: NoticiasService,
    private professorService: ProfessorService,
    private usuarioService: RegistrarService,
    private token: TokenStorageService

  ) {

    this.formNoticia = formBuilder.group({
      id: [''],
      noticias: ['', Validators.required],
      idprofessor: formBuilder.group({
        id: ['', Validators.required]
      }),
    });

   }

  ngOnInit() {

    this.initializeObjects();
    
  }

  toggleNoticia(){
    this.isNoticia = !this.isNoticia;
    this.isGabarito = true;
  }

  toggleGabarito(){
    this.isGabarito = !this.isGabarito;
    this.isNoticia = true;
  }

  popularDadosForm(dados) {
    this.formNoticia.patchValue({
      id: dados.id,
      noticias: dados.noticias,
      idprofessor: dados.idprofessor
    });
  }

  initializeObjects() {
    this.noticiaService.getNoticias()
      .subscribe(noticia => this.noticias = noticia.reverse());

      this.professorService.getProfessores()
      .subscribe(professor => this.professores = professor);

      this.usuarioService.getUsuarios()
      .subscribe(usuarios => this.usuarios = usuarios);

      setTimeout(() => {
        console.log(this.noticias);
      }, 2000);  
      

  }

}
