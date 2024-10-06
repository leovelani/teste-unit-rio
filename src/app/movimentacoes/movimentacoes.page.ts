import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from 'src/app/services/indexeddb.service';  // Certifique-se de que o caminho está correto
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.page.html',
  styleUrls: ['./movimentacoes.page.scss'],
})
export class MovimentacoesPage implements OnInit {

  movimentacao: any = {};  // Propriedade para armazenar os dados da movimentação
  produtos: any[] = [];  // Propriedade para armazenar os produtos disponíveis
  movimentacoes: any[] = [];  // Lista de movimentações

  constructor(private indexedDBService: IndexedDBService, private navCtrl: NavController) {}

  goBack() {
    this.navCtrl.navigateBack('folder/Inbox');
  }


  ngOnInit() {
    // Carregar os produtos do IndexedDB ao iniciar
    this.indexedDBService.getProdutos().then(produtos => {
      this.produtos = produtos;
    });

    // Carregar as movimentações já cadastradas
    this.loadMovimentacoes();
  }

  // Método para carregar todas as movimentações do IndexedDB
  loadMovimentacoes() {
    this.indexedDBService.getMovimentacoes().then(movs => {
      this.movimentacoes = movs;
    });
  }

  // Método que será chamado ao submeter o formulário
  onSubmit() {
    console.log('Movimentação cadastrada:', this.movimentacao);

    // Adicionar movimentação ao IndexedDB
    this.indexedDBService.addMovimentacao(this.movimentacao).then(() => {
      // Atualizar a lista de movimentações
      this.loadMovimentacoes();
      // Limpar o formulário após o salvamento
      this.movimentacao = {};
    }).catch((error) => {
      console.error('Erro ao adicionar movimentação:', error);
    });
  }

  // Método para excluir uma movimentação
  deleteMovimentacao(id_movimentacao: number) {
    this.indexedDBService.deleteMovimentacao(id_movimentacao).then(() => {
      // Atualizar a lista de movimentações após a exclusão
      this.loadMovimentacoes();
    }).catch((error) => {
      console.error('Erro ao excluir movimentação:', error);
    });
  }
}
