import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovimentacoesPage } from './movimentacoes.page';

const routes: Routes = [
  {
    path: '',
    component: MovimentacoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimentacoesPageRoutingModule {}
