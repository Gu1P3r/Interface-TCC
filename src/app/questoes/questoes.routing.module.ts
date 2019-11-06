import { AuthGuard } from './../guard/AuthGuard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestoesComponent } from './questoes.component';


const routes: Routes = [
    {
        path: '',
        data: {
          title: 'Pluri Online',
          urls: [
            { title: 'Pluri Online', url: '/questoes' },
            { title: 'Questoes' }
          ]
        },
        component: QuestoesComponent, canActivate: [AuthGuard]
      }
    ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class QuestoesRoutingModule {}