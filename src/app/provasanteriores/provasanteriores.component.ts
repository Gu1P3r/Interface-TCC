import { MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { ProvasService } from './service/provas.service';
import { RegistrarService } from '../registrar/service/registrar.service';
import { Usuarios } from '../domain/usuarios/usuarios';
import { TokenStorageService } from '../login/service/token-storage.service';
import { Provas } from '../domain/provas/provas';


@Component({
  selector: 'app-provasanteriores',
  templateUrl: './provasanteriores.component.html',
})
export class ProvasAnterioresComponent implements OnInit {

  formProvas: FormGroup;
  isListarProva : boolean = true;
  isProva : boolean = true;
  fileToUpload: File = null;
  usuario: Usuarios = new Usuarios();
  usuarios: Usuarios[];
  retorno: any;
  arquivos: String[];


  constructor(

    private formBuilder: FormBuilder,
    private provasService: ProvasService,
    private toastr: ToastrService,
    private usuarioService: RegistrarService,
    private token: TokenStorageService

  ){

    this.formProvas = formBuilder.group({
      nome: [''],
    });

  }

  ngOnInit() {

    this.usuarioService.getUsuarios()
      .subscribe(usuarios => this.usuarios = usuarios);

      this.provasService.getFiles().subscribe(dados => this.retorno = dados);


      setTimeout(() => {
        console.log(this.retorno._body);
        this.arquivos = this.retorno._body.split(",");
        console.log(this.arquivos);
      }, 1000);
      
}

  inputFileChange(file: FileList){

    this.fileToUpload = file.item(0); 
  }

  salvar(){
    var result;

    result = this.provasService.postFile(this.fileToUpload)
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

  toggleListarProva(){
    this.isListarProva = !this.isListarProva;
  }

  toggleProva(){

    this.usuarios.forEach(usuario => {

      if(this.token.getUsername() == usuario.email){

        if(usuario.tipo == 1){
  
          this.isProva = !this.isProva;
        }if(usuario.tipo != 1){
          this.toastr.error('Você não possui permissão', 'Ocorreu um erro ao tentar cadastrar uma prova');
        }
      }
    });
  }
}