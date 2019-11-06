import { LocaleDataIndex } from '@angular/common/src/i18n/locale_data';
import { AlunoService } from './../aluno/service/aluno.service';
import { Alunos } from './../domain/alunos/alunos';
import { Perguntas } from './../domain/perguntas/perguntas';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SimuladosService } from './service/simulados.service';
import { TokenStorageService } from '../login/service/token-storage.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-simulados',
  templateUrl: './simulados.component.html',
})
export class SimuladosComponent implements OnInit {

  formPerguntas: FormGroup;
  formAlunos: FormGroup;
  aluno: Alunos = new Alunos();
  alunos: Alunos[];

  pergunta: Perguntas = new Perguntas();
  perguntas: Perguntas[];

  questao: Perguntas = new Perguntas();
  correta: String;
  idaluno: Alunos = new Alunos();



  constructor(

    formBuilder: FormBuilder,
    private token: TokenStorageService,
    private toastr: ToastrService,
    private alunoService: AlunoService,
    private simuladoService: SimuladosService,
    private router: Router


  ) {

    this.formPerguntas = formBuilder.group({
      respostasimulado: ['', Validators.required],
    });

  }

  ngOnInit() {

    this.initializeObjects();

    $("#Simulado").hide();
  }

  initializeObjects() {

    this.alunoService.getAlunos()
      .subscribe(res => {
        this.alunos = res as Alunos[];
    });

    this.simuladoService.getSimulado()
      .subscribe(res => {
        this.perguntas = res as Perguntas[];
    });
  }

popularDadosForm(dados) {

  this.formPerguntas.patchValue({
  id: dados.id,
  disciplina: dados.disciplina,
  questao: dados.questao,
  alternativa1: dados.alternativa1,
  alternativa2: dados.alternativa2, 
  alternativa3: dados.alternativa3,
  alternativa4: dados.alternativa4,
  correta: dados.correta,
  idaluno: dados.idaluno,
  });
}

  toggleS() {

    $("#Simulado").toggle("fast");
    
    this.alunos.forEach(aluno => {
      
      if (aluno.idusuario.email == this.token.getUsername()) {

        setTimeout(() => {
          console.log(aluno.idusuario.email);
        }, 4000);

        this.idaluno = aluno;

        this.perguntas.forEach(pergunta => {

          if (pergunta.idcurso.id == aluno.idcurso.id) {
    
            
            this.questao = pergunta;

            this.correta = this.questao.correta;
    
          }
    
        });

      }

    });
    setTimeout(() => {
      console.log(this.questao);
    }, 4000);
    
  }

  resposta(){

    var result,
    perguntaValue = this.formPerguntas.value;

    if(perguntaValue.respostasimulado == this.questao.correta){

      console.log(this.idaluno);
      console.log(perguntaValue.respostasimulado);

      result = this.alunoService.acertosAluno(this.idaluno)
      .subscribe(
        suc => {
          this.toastr.success('Seu acerto foi computado', 'Parabéns você acertou a questão');
          setTimeout(() => {
            let resp = confirm('Deseja responder mais uma questão ?');
            if (resp === true) {
              location.reload();
            }else{
              this.router.navigateByUrl('/starter');
            }
          }, 2000);
        },
        err => {
          this.toastr.error('Resposta Incorreta');
          setTimeout(() => {
            // location.reload();
          }, 2000);
        }
      );

    }
}

}
