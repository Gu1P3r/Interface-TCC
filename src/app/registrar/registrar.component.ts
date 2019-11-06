import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../domain/usuarios/usuarios';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RegistrarService } from './service/registrar.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {

  formUsuario: FormGroup;
  usuario: Usuarios = new Usuarios();
  usuarios: Usuarios[];

  constructor(

    formBuilder: FormBuilder,
    private toastr: ToastrService,
    private usuarioService: RegistrarService,
    private router: Router

  ) {
    this.formUsuario = formBuilder.group({
      id: [''],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      tipo: ['', Validators.required],
      
    });
   }

  ngOnInit() {
  }

  sendSaveRequest() {
    var result,
      usuarioValue = this.formUsuario.value;
  
      if(usuarioValue.tipo == "1"){

        if(usuarioValue.email == "comissao.pluri@gmail.com" || usuarioValue.email == "guilherme.10.silva@hotmail.com" || usuarioValue.email == "leandromachado@iftm.edu.br"){

          result = this.usuarioService.addUsuarios(usuarioValue)
          .subscribe(
            suc => {
              this.toastr.success('', 'Usuário cadastrado com sucesso');
              setTimeout(() => {
                this.router.navigate(['/login'])
              }, 2000);
            },
            err => {
              this.toastr.error('Email não correspondente ao tipo de usuário', 'Ocorreu um erro ao tentar cadastrar um novo usuário');
            }
          );

        }else{
          this.toastr.error('Email não correspondente ao tipo de usuário', 'Ocorreu um erro ao tentar cadastrar um novo usuário');
        }

      }

      if(usuarioValue.tipo == "2"){

          result = this.usuarioService.addUsuarios(usuarioValue)
          .subscribe(
            suc => {
              this.toastr.success('', 'Usuário cadastrado com sucesso');
              setTimeout(() => {
                this.router.navigate(['/login'])
              }, 2000);
            },
            err => {
              this.toastr.error('Email não correspondente ao tipo de usuário', 'Ocorreu um erro ao tentar cadastrar um novo usuário');
            }
          );
      }

      if(usuarioValue.tipo == "3"){

        if(usuarioValue.email.includes("@iftm.edu.br")){

          result = this.usuarioService.addUsuarios(usuarioValue)
          .subscribe(
            suc => {
              this.toastr.success('', 'Usuário cadastrado com sucesso');
              setTimeout(() => {
                this.router.navigate(['/login'])
              }, 2000);
            },
            err => {
              this.toastr.error('Email não correspondente ao tipo de usuário', 'Ocorreu um erro ao tentar cadastrar um novo usuário');
            }
          );

        }else{
          this.toastr.error('Email não correspondente ao tipo de usuário', 'Ocorreu um erro ao tentar cadastrar um novo usuário');
        }

      }

  }


  initializeObjects() {

    this.usuarioService.getUsuarios()
      .subscribe(
        suc => {
          usuarioData => this.usuarios = usuarioData;
        },
        err => {
          this.toastr.error('', 'Ocorreu um erro ao carregar os dados');
        }
      );
    }

}
