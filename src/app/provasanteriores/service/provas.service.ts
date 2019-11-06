import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class ProvasService {

  private url: string = 'http://localhost:7765/provasanteriores';

  private formData = new FormData();

  private arquivos: any;

  constructor(private http : Http) { }

  postFile(fileToUpload: File) {

    this.formData.append('pdf', fileToUpload);

    return this.http.post(this.url + "/upload", this.formData);
    }

  getFiles(){
    return this.http.get(this.url + "/dados");
  }

}
