import { AuthGuard } from './../guard/AuthGuard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfessorComponent } from './professor.component';


const routes: Routes = [
    {
        path: '',
        data: {
          title: 'Pluri Online',
          urls: [
            { title: 'Pluri Online', url: '/professor' },
            { title: 'Professor' }
          ]
        },
        component: ProfessorComponent, canActivate: [AuthGuard]
      }
    ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class ProfessorRoutingModule {}