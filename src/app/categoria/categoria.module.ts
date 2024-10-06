import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaPageRoutingModule } from './categoria-routing.module';

import { CategoriaPage } from './categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaPageRoutingModule
  ],
  declarations: [CategoriaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Adicione esta linha para resolver o problema
})
export class CategoriaPageModule {}
