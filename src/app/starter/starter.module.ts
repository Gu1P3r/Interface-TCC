import { AuthInterceptor } from './../auth-interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StarterComponent } from './starter.component';
import { StarterRoutingModule } from './starter.routing.module';
import { NoticiasService } from '../noticias/service/noticias.service';
import { ProfessorService } from '../professor/service/professor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  imports: [FormsModule, CommonModule, StarterRoutingModule, ReactiveFormsModule, HttpClientModule],
  declarations: [StarterComponent],
  providers: [NoticiasService, ProfessorService,
  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  
  ]
})
export class StarterModule {}
