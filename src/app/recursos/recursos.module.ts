import { MaterialModule } from './../angular-material/material-module';
import { AuthInterceptor } from './../auth-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlunoService } from './../aluno/service/aluno.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecursosComponent } from './recursos.component';
import { RecursosRoutingModule } from './recursos.routing.module';
import { RecursosService } from './service/recursos.service';



@NgModule({
  imports: [FormsModule, CommonModule, RecursosRoutingModule, ReactiveFormsModule, HttpClientModule, MaterialModule],
  declarations: [RecursosComponent],
  providers: [RecursosService, AlunoService,
  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  
  ]
})
export class RecursosModule {}
