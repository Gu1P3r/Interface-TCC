import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Professores } from '../domain/professores/professores';
import { Usuarios } from '../domain/usuarios/usuarios';
import { ToastrService } from 'ngx-toastr';
import { ProfessorService } from './service/professor.service';
import { RegistrarService } from '../registrar/service/registrar.service';
import * as $ from 'jquery';
import { TokenStorageService } from '../login/service/token-storage.service';


@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
})
export class ProfessorComponent implements OnInit {

  formProfessor: FormGroup;
  professor: Professores = new Professores();
  professores: Professores[];
  usuarios: Usuarios[];

  professorSelecionado: Professores = new Professores();
  professoresSelecionado: Professores[];

  cadastro: number = 0;

  displayedColumns = ['cod', 'grandearea', 'nome', 'editar', 'excluir'];
  dataSource: MatTableDataSource<Professores>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(

    formBuilder: FormBuilder,
    private toastr: ToastrService,
    private professorService: ProfessorService,
    private usuarioService: RegistrarService,
    private token: TokenStorageService,

  ) {

    this.formProfessor = formBuilder.group({
      id: [''],
      grandearea: ['', Validators.required],
      nome: ['', Validators.required],
      idusuario: formBuilder.group({
        id: ['', Validators.required]
      })
    });

    this.dataSource = new MatTableDataSource(this.professores);
  }

  toggleCP() {

    this.professoresSelecionado.forEach(professorSelecionado => {

      if (this.token.getUsername() == professorSelecionado.idusuario.email) {
        this.cadastro = 1;
      }
    });

    if(this.cadastro == 1){
      this.toastr.error('Já existe um perfil para este usuário');
    }else{
      $("#cProfessores").toggle("fast");
    }
  }

  toggleAP() {
    $("#aProfessores").toggle("fast");
  }

  ngOnInit() {

    $("#cProfessores").hide();

    $("#aProfessores").hide();

    this.initializeObjects();

  }
  
  initializeObjects() {
    this.usuarioService.getUsuarios()
      .subscribe(usuarios => this.usuarios = usuarios);

    this.professorService.getProfessores()
      .subscribe(res => {
        this.dataSource.data = res as Professores[];
      });

    this.professorService.getProfessores()
      .subscribe(professores => this.professoresSelecionado = professores);

  }

  popularDadosForm(dados) {
    this.formProfessor.patchValue({
      id: dados.id,
      grandearea: dados.grandearea,
      nome: dados.nome,
      idusuario: dados.idusuario,
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

  editar(professor) {
    $("#cProfessores").toggle("fast");
    this.popularDadosForm(professor);
  }

  excluir(professor) {
    let resp = confirm('Deseja mesmo excluir este professor ?');
    if (resp === true) {
      this.professorService.deleteProfessores(professor.id)
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
      professorValue = this.formProfessor.value;

    if (professorValue.id) {
      console.log("UPDATE")
      result = this.professorService.updateProfessores(professorValue)
        .subscribe(
          suc => {
            this.toastr.success('', 'Professor editado com sucesso');
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
      result = this.professorService.addProfessores(professorValue)
        .subscribe(
          suc => {
            this.toastr.success('', 'Professor cadastrado com sucesso');
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

