import { Perguntas } from '../../domain/perguntas/perguntas';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';;
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
@Injectable()
export class QuestoesService {

  private url: string = 'http://localhost:7765/perguntas';

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


  constructor(private http: HttpClient, private router: Router) { }

  getPerguntas(): Observable<Perguntas[]> {
    return this.http.get<Perguntas[]>(this.url + "/dados");
  }

  getPergunta(id): Observable<Perguntas> {
    return this.http.get<Perguntas>(this.url + "/pergunta/" + id);
  }

  addPerguntas(pergunta) {
    return this.http.post(this.url + "/adicionar", JSON.stringify(pergunta), this.options);
  }

  updatePerguntas(pergunta) {
    return this.http.put(this.url + "/atualizar/" + pergunta.id, JSON.stringify(pergunta), this.options);
  }

  deletePerguntas(id) {
    return this.http.delete(this.url + "/deletar/" + id);
  }

}