import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './auth-interceptor';
import { AuthGuard } from './guard/AuthGuard';

import { LoginRoutingModule } from './login/login.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule} from '@angular/http'


import { FullComponent } from './layouts/full/full.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { RegistrarRoutingModule } from './registrar/registrar.routing.module';
import { RegistrarService } from './registrar/service/registrar.service';
import { LoginComponent } from './login/login.component';
import { TokenStorageService } from './login/service/token-storage.service';
import { AuthService } from './login/service/auth.service';
import { FileSelectDirective } from 'ng2-file-upload';
import { MedalhasComponent } from './medalhas/medalhas.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    RegistrarComponent,
    LoginComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    FileSelectDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    routing,
    LoginRoutingModule,
    RegistrarRoutingModule,
    PerfectScrollbarModule,
  ],
  providers: [
    AuthService,   
    AuthGuard,
    TokenStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    RegistrarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
