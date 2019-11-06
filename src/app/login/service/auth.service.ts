import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

  private usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  private loginUrl = 'http://localhost:7765/auth';

  token: string;

  constructor(private http: HttpClient,
              private router: Router
    ) { }

    fazerLogin(email: string, senha: string): Observable<any> {

      this.router.navigate(['/login']);

      const credentials = {email: email, senha: senha};
      return this.http.post(this.loginUrl + "/signin", credentials).do(   
        (success : any ) => {
          if(window.sessionStorage.length > 0){
            this.usuarioAutenticado = true;
            this.mostrarMenuEmitter.emit(true);
            this.router.navigate(['/login']);
          }
        }
      );
    }

    logout(){

    }

    usuarioEstaAutenticado(){
      return this.usuarioAutenticado;
    }

    deslogarDoSistema() {
      this.usuarioAutenticado = false;
      return this.usuarioAutenticado;
  }
  
}
