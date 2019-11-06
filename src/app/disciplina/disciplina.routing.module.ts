import { AuthGuard } from './../guard/AuthGuard';
import { DisciplinaComponent } from './disciplina.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        data: {
          title: 'Pluri Online',
          urls: [
            { title: 'Pluri Online', url: '/disciplina' },
            { title: 'Disciplina' }
          ]
        },
        component: DisciplinaComponent, canActivate: [AuthGuard]
      }
    ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class DisciplinaRoutingModule {}