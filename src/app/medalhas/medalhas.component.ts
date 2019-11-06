import { AlunoService } from './../aluno/service/aluno.service';
import { Alunos } from './../domain/alunos/alunos';
import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../domain/usuarios/usuarios';
import { TokenStorageService } from '../login/service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { RegistrarService } from '../registrar/service/registrar.service';

@Component({
  selector: 'app-medalhas',
  templateUrl: './medalhas.component.html',
})
export class MedalhasComponent implements OnInit {

  iniciante1: boolean = false;
  iniciante2: boolean = false;
  iniciante3: boolean = false;

  intermediario1: boolean = false;
  intermediario2: boolean = false;
  intermediario3: boolean = false;

  avancado1: boolean = false;
  avancado2: boolean = false;
  avancado3: boolean = false;

  isM : boolean = true;
  aluno: Alunos = new Alunos();
  alunos: Alunos[];
  usuario: Usuarios = new Usuarios();
  usuarios: Usuarios[];
  qtd: number;

  constructor(

    private token: TokenStorageService,
    private toastr: ToastrService,
    private usuarioService: RegistrarService,
    private alunoService: AlunoService,

  ) { }

  ngOnInit() {

    this.usuarioService.getUsuarios()
      .subscribe(usuarios => this.usuarios = usuarios);

    this.alunoService.getAlunos()
      .subscribe(alunos => this.alunos = alunos);
  }

  toggleMedalha(){

    this.usuarios.forEach(usuario => {

      if(this.token.getUsername() == usuario.email){

        if(usuario.tipo == 2){
  
          this.isM = !this.isM;

          this.alunos.forEach(aluno => { 

            if(this.token.getUsername() == aluno.idusuario.email){
                this.qtd = aluno.acertos;
                console.log(this.qtd);
            }

          });

        }if(usuario.tipo != 2){
          this.toastr.error('Você não é um aluno', 'Ocorreu um erro ao tentar acessar as medalhas');
        }
      }
    });

    if(this.qtd <= 3){
      this.iniciante1 = true;
    }
    else if(this.qtd <= 6){
      this.iniciante2 = true;
    }
    else if(this.qtd <= 10){
      this.iniciante3 = true;
    }
    else if(this.qtd <=15){
      this.intermediario1 = true;
    }
    else if(this.qtd <= 20){
      this.intermediario2 = true;
    }
    else if(this.qtd <= 25){
      this.intermediario3 = true;
    }
    else if(this.qtd <= 30){
      this.avancado1 = true;
    }
    else if(this.qtd <= 40){
      this.avancado2 = true;
    }
    else if(this.qtd <= 50){
      this.avancado3 = true;
    }
  }

}
