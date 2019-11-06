import { AlunoService } from './../aluno/service/aluno.service';
import { AuthInterceptor } from './../auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimuladosComponent } from './simulados.component';
import { SimuladosRoutingModule } from './simulados.routing.module';
import { SimuladosService } from './service/simulados.service';



@NgModule({
  imports: [FormsModule, CommonModule, SimuladosRoutingModule, ReactiveFormsModule, HttpClientModule],
  declarations: [SimuladosComponent],
  providers: [SimuladosService, AlunoService,
  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  
  ]
})
export class SimuladosModule {}
