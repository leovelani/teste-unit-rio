import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IndexedDBService } from '../services/indexeddb.service';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.page.html',
  styleUrls: ['./lista-compras.page.scss'],
})
export class ListaComprasPage implements OnInit {
  listaDeCompras: any[] = [];
  quantidadeMinima: number = 20;

  constructor(private indexedDBService: IndexedDBService, private navCtrl: NavController) {}

  goBack() {
    this.navCtrl.navigateBack('folder/Inbox');
  }

  ngOnInit() {
    this.gerarListaDeCompras();
  }
  gerarListaDeCompras() {
    Promise.all([
      this.indexedDBService.getProdutos(),
      this.indexedDBService.getEstoques()
    ]).then(([produtos, estoques]) => {
      this.listaDeCompras = produtos.filter(produto => produto.quantidade < this.quantidadeMinima).map(produto => {
        const estoque = estoques.find(e => e.id_estoque === produto.id_estoque);
        return {
          nome_estoque: estoque ? estoque.nome_estoque : 'Estoque Desconhecido',
          nome_produto: produto.nome_produto,
          qtd_atual: produto.quantidade,
          qtd_minima: this.quantidadeMinima,
          qtd_falta: (this.quantidadeMinima - produto.quantidade)
        };
      });
    }).catch((error) => {
      console.error('Erro ao gerar a lista de compras:', error);
    });
  }  
}
