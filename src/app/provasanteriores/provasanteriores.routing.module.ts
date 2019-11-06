import { AuthGuard } from './../guard/AuthGuard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvasAnterioresComponent } from './provasanteriores.component';



const routes: Routes = [
    {
        path: '',
        data: {
          title: 'Pluri Online',
          urls: [
            { title: 'Pluri Online', url: '/provasanteriores' },
            { title: 'Provas Anteriores' }
          ]
        },
        component: ProvasAnterioresComponent, canActivate: [AuthGuard]
      }
    ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class ProvasAnterioresRoutingModule {}