import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EstoquePage } from '../estoque/estoque.page';
import { CategoriaPage } from '../categoria/categoria.page';
import { ProdutoPage } from '../produto/produto.page';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(private modalCtrl: ModalController) {}

  async openEstoqueModal() {
    const modal = await this.modalCtrl.create({
      component: EstoquePage,
    });
    return await modal.present();
  }

  async openCategoriaModal() {
    const modal = await this.modalCtrl.create({
      component: CategoriaPage,
    });
    return await modal.present();
  }

  async openProdutoModal() {
    const modal = await this.modalCtrl.create({
      component: ProdutoPage,
    });
    return await modal.present();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
