import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RegistrarComponent } from './registrar/registrar.component';


export const Approutes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'registrar', component: RegistrarComponent},
  {
    path: '',
    component: FullComponent,

    children: [
      { path: '', redirectTo: '/starter', pathMatch: 'full' },
      {
        path: 'starter',
        loadChildren: './starter/starter.module#StarterModule'
      },
      {
        path: 'component',
        loadChildren: './component/component.module#ComponentsModule'
      },
      {
        path: 'about',
        loadChildren: './about/about.module#AboutModule'
      },
      {
        path: 'aluno',
        loadChildren: './aluno/aluno.module#AlunoModule'
      },
      {
        path: 'professor',
        loadChildren: './professor/professor.module#ProfessorModule'
      },
      {
        path: 'noticias',
        loadChildren: './noticias/noticias.module#NoticiasModule'
      },
      {
        path: 'questoes',
        loadChildren: './questoes/questoes.module#QuestoesModule'
      },
      {
        path: 'provasanteriores',
        loadChildren: './provasanteriores/provasanteriores.module#ProvasAnterioresModule'
      },
      {
        path: 'recursos',
        loadChildren: './recursos/recursos.module#RecursosModule'
      },
      {
        path: 'simulados',
        loadChildren: './simulados/simulados.module#SimuladosModule'
      },
      {
        path: 'disciplina',
        loadChildren: './disciplina/disciplina.module#DisciplinaModule'
      },
      {
        path: 'medalhas',
        loadChildren: './medalhas/medalhas.module#MedalhasModule'
      },
    ]
  },

  {
    path: '**',
    redirectTo: '/starter'
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(Approutes);