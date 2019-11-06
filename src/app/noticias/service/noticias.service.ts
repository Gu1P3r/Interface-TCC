import { Noticias } from '../../domain/noticias/noticias';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';;
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class NoticiasService {

  private url: string = 'http://localhost:7765/noticias';

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


  constructor(private http: HttpClient, private router: Router) { }

  getNoticias(): Observable<Noticias[]> {
    return this.http.get<Noticias[]>(this.url + "/dados");
  }

  getNoticia(id): Observable<Noticias> {
    return this.http.get<Noticias>(this.url + "/dados/" + id);
  }

  addNoticias(noticia) {
    return this.http.post(this.url + "/adicionar", JSON.stringify(noticia), this.options);
  }

  updateNoticias(noticia) {
    return this.http.put(this.url + "/atualizar/" + noticia.id, JSON.stringify(noticia), this.options);
  }

  deleteNoticias(id) {
    return this.http.delete(this.url + "/deletar/" + id);
  }
}