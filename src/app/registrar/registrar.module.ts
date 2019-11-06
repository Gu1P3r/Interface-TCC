import { UsuarioFilterPipe } from './filter/usuario.filter';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrarRoutingModule } from './registrar.routing.module';
import { RegistrarComponent } from './registrar.component';
import { RegistrarService } from './service/registrar.service';


@NgModule({
    imports: [FormsModule, CommonModule, RegistrarRoutingModule, HttpClientModule],
    declarations: [RegistrarComponent, UsuarioFilterPipe],
    providers: [RegistrarService]
})

export class RegistrarModule {}
