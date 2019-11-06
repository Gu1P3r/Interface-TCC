import { GabaritosService } from './../gabaritos/gabaritos.service';
import { Professores } from '../domain/professores/professores';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Noticias } from '../domain/noticias/noticias';
import { ToastrService } from 'ngx-toastr';
import { NoticiasService } from '../noticias/service/noticias.service';
import { ProfessorService } from '../professor/service/professor.service';
import { Usuarios } from '../domain/usuarios/usuarios';
import { RegistrarService } from '../registrar/service/registrar.service';
import { TokenStorageService } from '../login/service/token-storage.service';

const URL = 'http://localhost:7765/noticias/upload';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
})
export class NoticiasComponent implements OnInit {

  isGabarito : boolean = true;
  isNoticia : boolean = true;
  fileToUpload: File = null;
  formNoticia: FormGroup;
  noticia: Noticias = new Noticias();
  noticias: Noticias[];
  professores: Professores[];
  usuarios: Usuarios[];
  usuario: Usuarios = new Usuarios();

  constructor(

    formBuilder: FormBuilder,
    private toastr: ToastrService,
    private noticiaService: NoticiasService,
    private professorService: ProfessorService,
    private gabaritoService: GabaritosService,
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

  toggleGabarito(){

    this.isNoticia = true;

    this.usuarios.forEach(usuario => {

      if(this.token.getUsername() == usuario.email){

        if(usuario.tipo == 1){
  
          this.isGabarito = !this.isGabarito;

        }if(usuario.tipo != 1){
          this.toastr.error('Você não possui permissão', 'Ocorreu um erro ao tentar cadastrar uma gabarito');
        }
      }  
    });

  }
  toggleNoticia(){

    this.isGabarito = true;

    this.usuarios.forEach(usuario => {

      if(this.token.getUsername() == usuario.email){

        if(usuario.tipo == 1){
  
          this.isNoticia = !this.isNoticia;
        }if(usuario.tipo != 1){
          this.toastr.error('Você não possui permissão', 'Ocorreu um erro ao tentar cadastrar um noticia');
        }
      }  
    });
  }

  ngOnInit() {

    this.initializeObjects();
    
  }
  
  popularDadosForm(dados) {
    this.formNoticia.patchValue({
      id: dados.id,
      noticias: dados.noticias,
      idprofessor: dados.idprofessor
    });
  }

  inputFileChange(file: FileList){

    this.fileToUpload = file.item(0);

    console.log(this.fileToUpload);
  }

  salvar(){
    var result;

    result = this.gabaritoService.postFile(this.fileToUpload)
      .subscribe(
        suc => {
          this.toastr.success('Arquivo salvo', 'Upload de arquivo executado com sucesso');
          setTimeout(() => {
            location.reload();
          }, 2000);  
        },
        err => {
          this.toastr.error('Verifique seu arquivo', 'Ocorreu um erro ao tentar fazer o upload');
        }
      );
 }

  sendSaveRequest() {
    var result,
      noticiaValue = this.formNoticia.value;

    if (noticiaValue.id) {
      console.log("UPDATE")
      result = this.noticiaService.updateNoticias(noticiaValue)
        .subscribe(
          suc => {
            this.toastr.success('', 'Noticia editada com sucesso');
            setTimeout(() => {
              location.reload();
            }, 2000);
          },
          err => {
            this.toastr.error('Verifique se todos os campos foram preenchidos corretamente', 'Ocorreu um erro ao tentar salvar');
          }
        );
    } else {
      console.log("ADICIONAR")
      result = this.noticiaService.addNoticias(noticiaValue)
        .subscribe(
          suc => {
            this.toastr.success('Noticia cadastrada com sucesso');
            setTimeout(() => {
              location.reload();
            }, 2000);
          },
          err => {
            this.toastr.error('Verifique se todos os campos foram preenchidos corretamente', 'Ocorreu um erro ao tentar cadastrar a noticia');
          }
        );
    }
  }

  initializeObjects() {
    this.noticiaService.getNoticias()
      .subscribe(noticia => this.noticias = noticia);

      this.professorService.getProfessores()
      .subscribe(professor => this.professores = professor);

      this.usuarioService.getUsuarios()
      .subscribe(usuarios => this.usuarios = usuarios);
  }

  

}
