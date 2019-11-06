import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarComponent } from './registrar.component';


const RegistrarRoutes: Routes = [
    {
      path: 'registrar', component: RegistrarComponent,
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(RegistrarRoutes)],
    exports: [RouterModule]
  })

  export class RegistrarRoutingModule {}