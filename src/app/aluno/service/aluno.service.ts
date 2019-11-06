import { Alunos } from '../../domain/alunos/alunos';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';;
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class AlunoService {

  private url: string = 'http://localhost:7765/alunos';

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient, private router: Router) { }

  
  getAlunos(): Observable<Alunos[]> {
    return this.http.get<Alunos[]>(this.url + "/dados");
  }

  getAluno(id): Observable<Alunos> {
    return this.http.get<Alunos>(this.url + "/dados/" + id);
  }

  addAlunos(aluno) {
    return this.http.post(this.url + "/adicionar", JSON.stringify(aluno), this.options);
  }

  updateAlunos(aluno) {
    return this.http.put(this.url + "/atualizar/" + aluno.id, JSON.stringify(aluno), this.options);
  }

  acertosAluno(idaluno) {
    return this.http.put(this.url + "/acertos/" + idaluno.id, JSON.stringify(idaluno), this.options);
  }

  deleteAlunos(id) {
    return this.http.delete(this.url + "/deletar/" + id);
  }

}
