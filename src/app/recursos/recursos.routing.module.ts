import { AuthGuard } from './../guard/AuthGuard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecursosComponent } from './recursos.component';


const routes: Routes = [
    {
        path: '',
        data: {
          title: 'Pluri Online',
          urls: [
            { title: 'Pluri Online', url: '/recursos' },
            { title: 'Recursos' }
          ]
        },
        component: RecursosComponent, canActivate: [AuthGuard]
      }
    ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class RecursosRoutingModule{}