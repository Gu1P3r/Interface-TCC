import { MaterialModule } from './../angular-material/material-module';
import { AuthInterceptor } from './../auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisciplinaComponent } from './disciplina.component';
import { DisciplinaRoutingModule } from './disciplina.routing.module';

import { CursoService } from '../curso/service/curso.service';
import { ProfessorService } from '../professor/service/professor.service';
import { DisciplinaService } from './service/disciplina.service';



@NgModule({
  imports: [FormsModule, CommonModule, DisciplinaRoutingModule, ReactiveFormsModule, HttpClientModule, MaterialModule],
  declarations: [DisciplinaComponent],
  providers: [DisciplinaService, ProfessorService, CursoService,
  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  
  ]
})
export class DisciplinaModule {}