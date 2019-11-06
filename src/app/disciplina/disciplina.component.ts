import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CursoService } from './../curso/service/curso.service';
import { ProfessorService } from './../professor/service/professor.service';
import { Disciplinas } from '../domain/disciplinas/disciplinas';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Professores } from '../domain/professores/professores';
import { ToastrService } from 'ngx-toastr';
import { Cursos } from '../domain/cursos/cursos';
import { DisciplinaService } from './service/disciplina.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html'
})
export class DisciplinaComponent implements OnInit {

  formDisciplina: FormGroup;
  disciplina: Disciplinas = new Disciplinas();
  disciplinas: Disciplinas[];
  professores: Professores[];
  cursos: Cursos[];

  displayedColumns = ['cod', 'nome', 'idcurso', 'idprofessor', 'editar', 'excluir'];
  dataSource: MatTableDataSource<Disciplinas>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(

    formBuilder: FormBuilder,
    private toastr: ToastrService,
    private disciplinaService: DisciplinaService,
    private professorService: ProfessorService,
    private cursosService: CursoService
    

  ) { 

    this.formDisciplina = formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      idcurso: formBuilder.group({
        id: ['', Validators.required],
        nome: ['', Validators.required]
      }),
      idprofessor: formBuilder.group({
        id: ['', Validators.required],
        nome: ['', Validators.required]
      })
    });

    this.dataSource = new MatTableDataSource(this.disciplinas);

  }

  toggleCD(){
    $("#cDisciplina").toggle("fast");
  }

  toggleAD(){
    $("#aDisciplina").toggle("fast");
  }

  ngOnInit() {

    $("#cDisciplina").hide();

    $("#aDisciplina").hide();

    this.initializeObjects();
  }

  initializeObjects() {

    this.professorService.getProfessores()
      .subscribe(professores => this.professores = professores);

    this.cursosService.getCursos()
      .subscribe(cursos => this.cursos = cursos);

    this.disciplinaService.getDisciplinas()
      .subscribe(res => {
        this.dataSource.data = res as Disciplinas[];
      });
  }

  popularDadosForm(dados) {
    this.formDisciplina.patchValue({
      id: dados.id,
      nome: dados.nome,
      idcurso: dados.idcurso,
      idprofessor: dados.idprofessor,
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

  editar(disciplina) {
    
    $("#cDisciplina").toggle("fast");
    this.popularDadosForm(disciplina);
  }

  excluir(disciplina) {
    let resp = confirm('Deseja mesmo excluir esta disciplina ?');
    if (resp === true) {
      this.disciplinaService.deleteDisciplinas(disciplina.id)
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
      disciplinaValue = this.formDisciplina.value;

    if (disciplinaValue.id) {
      console.log("UPDATE")
      result = this.disciplinaService.updateDisciplinas(disciplinaValue)
        .subscribe(
          suc => {
            this.toastr.success('', 'Disciplina editada com sucesso');
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
      result = this.disciplinaService.addDisciplinas(disciplinaValue)
        .subscribe(
          suc => {
            this.toastr.success('', 'Disciplina cadastrada com sucesso');
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
