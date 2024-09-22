import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovimentacoesPageRoutingModule } from './movimentacoes-routing.module';

import { MovimentacoesPage } from './movimentacoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovimentacoesPageRoutingModule
  ],
  declarations: [MovimentacoesPage]
})
export class MovimentacoesPageModule {}
