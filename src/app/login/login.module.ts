import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing.module';


@NgModule({
    imports: [FormsModule, CommonModule, LoginRoutingModule, ReactiveFormsModule, HttpClientModule, HttpClient],
    declarations: [],
    providers: [LoginComponent]
})

export class LoginModule {}
