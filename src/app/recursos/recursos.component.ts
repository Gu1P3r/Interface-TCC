import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Alunos } from '../domain/alunos/alunos';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Recursos } from '../domain/recursos/recursos';
import { AlunoService } from '../aluno/service/aluno.service';
import { RecursosService } from './service/recursos.service';
import { getLocaleDateFormat } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
})
export class RecursosComponent implements OnInit {

  formRecurso: FormGroup;
  recurso: Recursos = new Recursos();
  recursos: Recursos[];
  alunos: Alunos[];

  displayedColumns = ['cod', 'nome', 'curso', 'professormateria', 'data', 'editar', 'excluir'];
  dataSource: MatTableDataSource<Recursos>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(

    formBuilder: FormBuilder,
    private toastr: ToastrService,
    private recursoService: RecursosService,
    private alunoService: AlunoService,

  ) {
    this.formRecurso = formBuilder.group({
      id: [''],
      tipoprova: ['', Validators.required],
      professormateria: ['', Validators.required],
      numeroquestao: ['', Validators.required],
      fundamento: ['', Validators.required],
      data: getLocaleDateFormat,
      curso: ['', Validators.required],
      solicitacao: ['', Validators.required],
      nome: ['', Validators.required],
      idaluno: formBuilder.group({
        id: ['', Validators.required],
      })
    });

    this.dataSource = new MatTableDataSource(this.recursos);
   }

  toggleCR(){
    $("#cRecurso").toggle("fast");
  }

  toggleAR(){
    $("#aRecurso").toggle("fast");
  }

  ngOnInit() {

    this.initializeObjects();

    $("#cRecurso").hide();

    $("#aRecurso").hide();
    
  }

  initializeObjects() {

    this.recursoService.getRecursos()
      .subscribe(res => {
        this.dataSource.data = res as Recursos[];
      });

      this.alunoService.getAlunos()
      .subscribe(aluno => this.alunos = aluno);
  }

  popularDadosForm(dados) {
    this.formRecurso.patchValue({
      id: dados.id,
      nome: dados.nome,
      tipoprova: dados.tipoprova,
      numeroquestao: dados.numeroquestao,
      professormateria: dados.professormateria,
      curso: dados.fundamento,
      data:dados.data,
      idaluno: dados.idaluno
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

  editar(recurso) {
    $("#cRecurso").toggle("fast");
    this.popularDadosForm(recurso);
  }

  excluir(recurso) {
    let resp = confirm('Deseja mesmo excluir este recurso ?');
    if (resp === true) {
      this.recursoService.deleteRecursos(recurso.id)
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
      recursoValue = this.formRecurso.value;

      console.log(recursoValue);

    if (recursoValue.id) {
      console.log("UPDATE")
      result = this.recursoService.updateRecursos(recursoValue)
        .subscribe(
          suc => {
            this.toastr.success('', 'Recurso editado com sucesso');
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
      result = this.recursoService.addRecursos(recursoValue)
        .subscribe(
          suc => {
            this.toastr.success('', 'Recurso cadastrado com sucesso');
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
