import { MaterialModule } from './../angular-material/material-module';
import { AuthInterceptor } from './../auth-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarService } from '../registrar/service/registrar.service';
import { ProfessorComponent } from './professor.component';
import { ProfessorRoutingModule } from './professor.routing.module';
import { ProfessorService } from './service/professor.service';



@NgModule({
  imports: [FormsModule, CommonModule, ProfessorRoutingModule, ReactiveFormsModule, HttpClientModule, MaterialModule],
  declarations: [ProfessorComponent],
  providers: [ProfessorService, RegistrarService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    
  ]
})
export class ProfessorModule {}
