import { MedalhasComponent } from './medalhas.component';
import { AlunoService } from './../aluno/service/aluno.service';
import { AuthInterceptor } from './../auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedalhasRoutingModule } from './medalhas.routing.module';




@NgModule({
  imports: [FormsModule, CommonModule, MedalhasRoutingModule, ReactiveFormsModule, HttpClientModule],
  declarations: [MedalhasComponent],
  providers: [AlunoService,
  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }

  ]
})
export class MedalhasModule {}
