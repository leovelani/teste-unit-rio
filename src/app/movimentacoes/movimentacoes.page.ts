import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.page.html',
  styleUrls: ['./movimentacoes.page.scss'],
})
export class MovimentacoesPage implements OnInit {

  movimentacao: any = {};  // Propriedade para armazenar os dados da movimentação
  produtos: any[] = [];  // Propriedade para armazenar os produtos disponíveis

  constructor() { }

  ngOnInit() {
    // Simulação de produtos para o select
    this.produtos = [
      { id_produto: 1, nome_produto: 'Produto A' },
      { id_produto: 2, nome_produto: 'Produto B' },
      { id_produto: 3, nome_produto: 'Produto C' }
    ];
  }

  // Método que será chamado ao submeter o formulário
  onSubmit() {
    console.log('Movimentação cadastrada:', this.movimentacao);

    // Simulação de salvamento dos dados da movimentação no localStorage
    let movimentacoes = JSON.parse(localStorage.getItem('movimentacoes') || '[]');
    movimentacoes.push(this.movimentacao);
    localStorage.setItem('movimentacoes', JSON.stringify(movimentacoes));

    // Limpar o formulário após o salvamento
    this.movimentacao = {};
  }
}
