import { MaterialModule } from './../angular-material/material-module';
import { AlunoFilterPipe } from './filter/aluno.filter';
import { AuthInterceptor } from './../auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlunoComponent } from './aluno.component';
import { AlunoRoutingModule } from './aluno.routing.module';
import { AlunoService } from './service/aluno.service';
import { RegistrarService } from '../registrar/service/registrar.service';
import { CursoService } from '../curso/service/curso.service';



@NgModule({
  imports: [FormsModule, CommonModule, AlunoRoutingModule, ReactiveFormsModule, HttpClientModule, MaterialModule],
  declarations: [AlunoComponent, AlunoFilterPipe],
  providers: [AlunoService, RegistrarService, CursoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AlunoModule {}
