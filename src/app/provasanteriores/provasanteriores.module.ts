import { ProvasService } from './service/provas.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProvasAnterioresComponent } from './provasanteriores.component';
import { ProvasAnterioresRoutingModule } from './provasanteriores.routing.module';


@NgModule({
  imports: [FormsModule, CommonModule, ProvasAnterioresRoutingModule, ReactiveFormsModule, HttpClientModule],
  declarations: [ProvasAnterioresComponent],
  providers:[ProvasService]
})
export class ProvasAnterioresModule {}
