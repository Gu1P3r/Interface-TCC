import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Alunos } from '../domain/alunos/alunos';
import { Usuarios } from '../domain/usuarios/usuarios';
import { ToastrService } from 'ngx-toastr';
import { RegistrarService } from '../registrar/service/registrar.service';
import { AlunoService } from './service/aluno.service';
import { Cursos } from '../domain/cursos/cursos';
import { CursoService } from '../curso/service/curso.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import * as $ from 'jquery';
import { TokenStorageService } from '../login/service/token-storage.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html'
})
export class AlunoComponent implements OnInit {


  formAluno: FormGroup;
  aluno: Alunos = new Alunos();
  alunos: Alunos[];
  usuarios: Usuarios[];
  cursos: Cursos[];

  alunoSelecionado: Alunos = new Alunos();
  alunosSelecionado: Alunos[];

  cadastro: number = 0;

  displayedColumns = ['cod', 'nome', 'raaluno', 'idcurso', 'editar', 'excluir'];
  dataSource: MatTableDataSource<Alunos>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(

    formBuilder: FormBuilder,
    private toastr: ToastrService,
    private alunoService: AlunoService,
    private usuarioService: RegistrarService,
    private cursoService: CursoService,
    private token: TokenStorageService,

  ) {

    this.formAluno = formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      raaluno: ['', Validators.required],
      idusuario: formBuilder.group({
        id: ['', Validators.required]
      }),
      idcurso: formBuilder.group({
        id: ['', Validators.required]
      })
    });

    this.dataSource = new MatTableDataSource(this.alunos);
  }

  toggleCA() {

    this.alunosSelecionado.forEach(alunoSelecionado => {

      if (this.token.getUsername() == alunoSelecionado.idusuario.email) {
        this.cadastro = 1;
      }
    });

    if(this.cadastro == 1){
      this.toastr.error('Já existe um perfil para este usuário');
    }else{
      $("#cAlunos").toggle("fast");
    }
  }

  toggleAA() {
    $("#aAlunos").toggle("fast");
  }

  ngOnInit() {

    $("#cAlunos").hide();

    $("#aAlunos").hide();

    this.initializeObjects();
  }

  initializeObjects() {
    this.usuarioService.getUsuarios()
      .subscribe(usuarios => this.usuarios = usuarios);

    this.alunoService.getAlunos()
      .subscribe(res => {
        this.dataSource.data = res as Alunos[];
      });

    this.cursoService.getCursos()
      .subscribe(cursos => this.cursos = cursos);

    this.alunoService.getAlunos()
      .subscribe(alunos => this.alunosSelecionado = alunos);
  }

  popularDadosForm(dados) {
    this.formAluno.patchValue({
      id: dados.id,
      raaluno: dados.raaluno,
      nome: dados.nome,
      idusuario: dados.idusuario,
      idcurso: dados.idcurso
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

  editar(aluno) {

    $("#cAlunos").toggle("fast");
    this.popularDadosForm(aluno);

  }

  excluir(aluno) {
    let resp = confirm('Deseja mesmo excluir este aluno ?');
    if (resp === true) {
      this.alunoService.deleteAlunos(aluno.id)
        .subscribe(
          suc => {
            this.toastr.warning('', 'Registro excluido com sucesso. ');
            this.initializeObjects();
          },
          err => {
            this.toastr.error('Ocorreu um erro ao tentar excluir o registro');
          }
        )
    } else {
      return;
    }
  }

  sendSaveRequest() {
    var result,
      alunoValue = this.formAluno.value;

    if (alunoValue.id) {
      console.log("UPDATE")
      result = this.alunoService.updateAlunos(alunoValue)
        .subscribe(
          suc => {
            this.toastr.success('', 'Aluno editado com sucesso');
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

      result = this.alunoService.addAlunos(alunoValue)
        .subscribe(
          suc => {
            this.toastr.success('', 'Aluno cadastrado com sucesso');
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
