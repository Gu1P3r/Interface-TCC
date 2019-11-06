import { Usuarios } from '../../domain/usuarios/usuarios';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';;
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';



@Injectable()
export class RegistrarService {

  private url: string = 'http://localhost:7765/usuarios';

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient, private router: Router) { }


    getUsuarios(): Observable<Usuarios[]> {
      return this.http.get<Usuarios[]>(this.url + "/dados");
    }

    getUsuario(id): Observable<Usuarios> {
      return this.http.get<Usuarios>(this.url + "/dados/" + id);
    }
  
    addUsuarios(usuario) {

      return this.http.post(this.url + "/adicionar", JSON.stringify(usuario), this.options);
    }
  
    updateUsuarios(usuario) {

      return this.http.put(this.url + "/atualizar/" + usuario.id, JSON.stringify(usuario), this.options);
    }
  
    deleteUsuarios(id) {
      return this.http.delete(this.url + "/deletar/" + id);
    }
}