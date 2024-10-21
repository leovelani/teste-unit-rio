import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IndexedDBService } from '../services/indexeddb.service';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.page.html',
  styleUrls: ['./lista-compras.page.scss'],
})
export class ListaComprasPage implements OnInit {
  listaDeCompras: any[] = []; // Armazanamento
  quantidadeMinima: number = 20;

  constructor(private indexedDBService: IndexedDBService, private navCtrl: NavController) { }

  goBack() {
    this.navCtrl.navigateBack('folder/Inbox');
  }


  ngOnInit() {
    this.gerarListaDeCompras();  // Gera a lista ao carregar a página
  }

  // Método para gerar a lista de compras
  gerarListaDeCompras() {
    this.indexedDBService.getProdutos().then((produtos) => {
      // Filtra os produtos que estão abaixo de 20 e cria a lista de compras
      this.listaDeCompras = produtos.filter(produto => produto.quantidade < this.quantidadeMinima).map(produto => ({
        nome_estoque: produto.nome_estoque,
        categoria: produto.categoria,
        nome_produto: produto.nome_produto,
        qtd_minima: this.quantidadeMinima,  // Define o mínimo como 20
        qtd_falta: (this.quantidadeMinima - produto.quantidade).toFixed(2)  // Calcula o que falta para atingir 20
      }));
    }).catch((error) => {
      console.error('Erro ao gerar a lista de compras:', error);
    });
  }

}
