import { Component, OnInit, EventEmitter } from '@angular/core';
import { TokenStorageService } from './service/token-storage.service';
import { AuthService } from './service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from './model/login';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  formLogin: FormGroup;
  userLogin: UserLogin = new UserLogin();

  constructor(
    formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private token: TokenStorageService,
    private toasterService: ToastrService

  ) {
    this.formLogin = formBuilder.group({
      email: [''],
      senha: ['']
    });
  }

  ngOnInit() {
  }

  login(): void {
    this.authService.fazerLogin(this.userLogin.email, this.userLogin.senha).subscribe(
      data => {

        this.token.saveToken(data.token);
        this.token.saveUsername(this.userLogin.email);
        this.router.navigate(['/relatorio']);
      },
      err => {
        this.toasterService.error("Usuario ou senha estão incorretos.");
      }
    );
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }

  deslogarDoSistema() {
    this.usuarioAutenticado = false;
    return this.usuarioAutenticado;
}

registrar() {

  this.router.navigate(['/registrar']);

}

}
