import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  produto: any = {};  // Propriedade para armazenar os dados do produto
  categorias: any[] = [];  // Simulação de categorias disponíveis

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
  constructor() { }

  ngOnInit() {
    // Simulação de categorias para o select
    this.categorias = [
      { id_categoria: 1, nome_categoria: 'Eletrônicos' },
      { id_categoria: 2, nome_categoria: 'Roupas' },
      { id_categoria: 3, nome_categoria: 'Alimentos' }
    ];
  }

  // Método que será chamado ao submeter o formulário
  onSubmit() {
    console.log('Produto cadastrado:', this.produto);

    // Simulação de salvamento dos dados do produto no localStorage
    let produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    produtos.push(this.produto);
    localStorage.setItem('produtos', JSON.stringify(produtos));

    // Limpar o formulário após o salvamento
    this.produto = {};
  }
}
