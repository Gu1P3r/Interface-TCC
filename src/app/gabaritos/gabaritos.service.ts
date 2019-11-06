import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class GabaritosService {

  private url: string = 'http://localhost:7765/noticias';

  private formData = new FormData();

  constructor(private http : Http) { }

  postFile(fileToUpload: File) {

    this.formData.append('pdf', fileToUpload);

    return this.http.post(this.url + "/upload", this.formData);
    }

}
