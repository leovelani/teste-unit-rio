import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from 'src/app/services/indexeddb.service';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.page.html',
  styleUrls: ['./movimentacoes.page.scss'],
})
export class MovimentacoesPage implements OnInit {

  movimentacao: any = {};  // Propriedade para armazenar os dados da movimentação
  produtos: any[] = [];  // Propriedade para armazenar os produtos disponíveis
  movimentacoes: any[] = [];  // Lista de movimentações

  constructor(private indexedDBService: IndexedDBService) {}

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
    // Verificar se estamos editando ou adicionando
    if (this.movimentacao.id_movimentacao) {
      // Atualizar movimentação existente
      this.indexedDBService.updateMovimentacao(this.movimentacao).then(() => {
        this.loadMovimentacoes();
        this.movimentacao = {}; // Limpar o formulário após atualização
      }).catch((error) => {
        console.error('Erro ao atualizar movimentação:', error);
      });
    } else {
      // Adicionar nova movimentação
      this.indexedDBService.addMovimentacao(this.movimentacao).then(() => {
        // Atualizar a lista de movimentações
        this.loadMovimentacoes();
        // Limpar o formulário após o salvamento
        this.movimentacao = {};
      }).catch((error) => {
        console.error('Erro ao adicionar movimentação:', error);
      });
    }
  }

  // Método para editar uma movimentação
  editMovimentacao(mov: any) {
    this.movimentacao = { ...mov }; // Carregar dados da movimentação para edição
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