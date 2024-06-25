import { Routes } from '@angular/router';
import { PessoaListaComponent } from './pessoa-lista/pessoa-lista.component';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';

export const routes: Routes = [
  {
    path: 'pessoas',
    component: PessoaListaComponent,
    title: 'Pessoas',
  },
  {
    path: 'pessoas/incluir',
    component: PessoaFormComponent,
    title: 'Pessoas - Incluir',
  },
  {
    path: 'pessoas/alterar/:id',
    component: PessoaFormComponent,
    title: 'Pessoas - Alterar',
  },
];
