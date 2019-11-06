import { AuthInterceptor } from './../auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoticiasRoutingModule } from './Noticias.routing.module';
import { NoticiasComponent } from './noticias.component';
import { NoticiasService } from '../noticias/service/noticias.service';
import { ProfessorService } from '../professor/service/professor.service';
import { GabaritosService } from '../gabaritos/gabaritos.service';




@NgModule({
  imports: [FormsModule, CommonModule, NoticiasRoutingModule, ReactiveFormsModule, HttpClientModule],
  declarations: [NoticiasComponent],
  providers: [NoticiasService, ProfessorService, GabaritosService,
  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }

  ]
})
export class NoticiasModule {}
