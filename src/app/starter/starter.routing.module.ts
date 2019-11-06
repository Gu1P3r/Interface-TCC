import { AuthGuard } from './../guard/AuthGuard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StarterComponent } from './starter.component';

const routes: Routes = [
    {
      path: '',
      data: {
        title: 'Pluri Online',
        urls: [
          { title: 'Pluri Online', url: '/home' },
          { title: 'Home Page' }
        ]
      },
      component: StarterComponent, canActivate: [AuthGuard]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class StarterRoutingModule {}