import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Perguntas } from '../domain/perguntas/perguntas';
import { Cursos } from '../domain/cursos/cursos';
import { Disciplinas } from '../domain/disciplinas/disciplinas';
import { ToastrService } from 'ngx-toastr';
import { CursoService } from '../curso/service/curso.service';
import { QuestoesService } from './service/questoes.service';
import { DisciplinaService } from '../disciplina/service/disciplina.service';
import { Professores } from '../domain/professores/professores';
import { ProfessorService } from '../professor/service/professor.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-questoes',
  templateUrl: './questoes.component.html',
})
export class QuestoesComponent implements OnInit {

  reaplicacao: boolean = false;

  formPerguntas: FormGroup;
  pergunta: Perguntas = new Perguntas();
  perguntas: Perguntas[];
  cursos: Cursos[];
  professores: Professores[];
  disciplinas: Disciplinas[];

  displayedColumns = ['cod', 'assunto', 'nivel', 'iddisciplina', 'idprofessor', 'editar', 'excluir'];
  dataSource: MatTableDataSource<Perguntas>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(

    formBuilder: FormBuilder,
    private toastr: ToastrService,
    private perguntaService: QuestoesService,
    private cursoService: CursoService,
    private disciplinaService: DisciplinaService,
    private professorService: ProfessorService

  ) {

    this.formPerguntas = formBuilder.group({
      id: [''],
      questao: ['', Validators.required],
      alternativa1: ['', Validators.required],
      alternativa2: ['', Validators.required],
      alternativa3: ['', Validators.required],
      alternativa4: ['', Validators.required],
      correta: ['', Validators.required],
      nivel: ['', Validators.required],
      assunto: ['', Validators.required],
      reaplicacao: ['', Validators.required],
      anoaplicado: ['', Validators.required],
      iddisciplina: formBuilder.group({
        id: ['', Validators.required]
      }),
        
      idprofessor: formBuilder.group({
        id: ['', Validators.required]
      }),

      idcurso: formBuilder.group({
        id: ['', Validators.required]
      }),
    });

    this.dataSource = new MatTableDataSource(this.perguntas);
  }

  onchange(re){
    if(re==1){
      this.reaplicacao=true;
    }else{
      this.reaplicacao=false;
    }
  }


  toggleCQ() {
    $("#cQuestoes").toggle("fast");
  }

  toggleAQ() {
    $("#aQuestoes").toggle("fast");
  }

  reaplicar() {
    this.reaplicacao = !this.reaplicacao;
  }

  ngOnInit() {

    $("#cQuestoes").hide();

    $("#aQuestoes").hide();
  
    this.initializeObjects();
  
  }

  initializeObjects() {

    this.disciplinaService.getDisciplinas()
      .subscribe(disciplinas => this.disciplinas = disciplinas);

    this.cursoService.getCursos()
      .subscribe(cursos => this.cursos = cursos);

    this.professorService.getProfessores()
      .subscribe(professores => this.professores = professores);

    this.perguntaService.getPerguntas()
      .subscribe(res => {
        this.dataSource.data = res as Perguntas[];
      });

}

  popularDadosForm(dados) {
    this.formPerguntas.patchValue({
      id: dados.id,
      questao: dados.questao,
      alternativa1: dados.alternativa1,
      alternativa2: dados.alternativa2,
      alternativa3: dados.alternativa3,
      alternativa4: dados.alternativa4,
      correta: dados.correta,
      nivel: dados.nivel,
      assunto: dados.assunto,
      reaplicacao: dados.reaplicacao,
      anoaplicado:dados.anoaplicado,
      idcurso: dados.idcurso,
      idprofessor: dados.idprofessor,
      iddisciplina: dados.iddisciplina
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editar(pergunta) {

    $("#cQuestoes").toggle("fast");
    this.popularDadosForm(pergunta);
  }

  excluir(pergunta) {
    let resp = confirm('Deseja mesmo excluir esta pergunta ?');
    if (resp === true) {
      this.perguntaService.deletePerguntas(pergunta.id)
        .subscribe(
          suc => {
            this.toastr.warning('', 'Registro excluido com sucesso. ');
            this.initializeObjects();
          },
          err => {
            this.toastr.error('O seu usuario não possui permissão', 'Ocorreu um erro ao tentar excluir o registro');
          }
        )
    } else {
      return;
    }
  }

  sendSaveRequest() {
    var result,
      perguntaValue = this.formPerguntas.value;

    if (perguntaValue.id) {
      console.log("UPDATE")
      result = this.perguntaService.updatePerguntas(perguntaValue)
        .subscribe(
          suc => {
            this.toastr.success('', 'Questão editada com sucesso');
            setTimeout(() => {
              location.reload();
            }, 2000);
          },
          err => {
            this.toastr.error('Verifique se você permite permissão e se todos os campos foram preenchidos corretamente', 'Ocorreu um erro ao tentar salvar');
          }
        );
    } else {
      console.log("ADICIONAR")
      result = this.perguntaService.addPerguntas(perguntaValue)
        .subscribe(
          suc => {
            this.toastr.success('', 'Questão cadastrada com sucesso');
            setTimeout(() => {
              location.reload();
            }, 2000);
          },
          err => {
            this.toastr.error('Verifique se você permite permissão e se todos os campos foram preenchidos corretamente', 'Ocorreu um erro ao tentar salvar');
          }
        );
    }
  }
}
