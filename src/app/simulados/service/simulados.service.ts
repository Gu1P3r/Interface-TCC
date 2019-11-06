import { Router } from '@angular/router';
import { Perguntas } from './../../domain/perguntas/perguntas';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';;
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SimuladosService {

  private url: string = 'http://localhost:7765/perguntas';

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient, private router: Router) { }


  getSimulado(): Observable<Perguntas[]> {
    return this.http.get<Perguntas[]>(this.url + "/simulado/");
  }

 /*  getPerguntas(idaluno){
    return this.http.get(this.url + "/dados/"+idaluno).map(res => res.json(), this.options);
  } */
}