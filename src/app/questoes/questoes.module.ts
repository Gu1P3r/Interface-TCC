import { MaterialModule } from './../angular-material/material-module';
import { AuthInterceptor } from './../auth-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DisciplinaService } from './../disciplina/service/disciplina.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CursoService } from '../curso/service/curso.service';
import { QuestoesComponent } from './questoes.component';
import { QuestoesRoutingModule } from './questoes.routing.module';
import { QuestoesService } from './service/questoes.service';
import { ProfessorService } from '../professor/service/professor.service';



@NgModule({
  imports: [FormsModule, CommonModule, QuestoesRoutingModule, ReactiveFormsModule, HttpClientModule, MaterialModule],
  declarations: [QuestoesComponent],
  providers: [QuestoesService, ProfessorService, CursoService, DisciplinaService,
  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  
  ]
})
export class QuestoesModule {}
