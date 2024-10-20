import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from 'src/app/services/indexeddb.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.page.html',
  styleUrls: ['./movimentacoes.page.scss'],
})
export class MovimentacoesPage implements OnInit {

  movimentacao: any = {};
  produtos: any[] = [];
  movimentacoes: any[] = [];
  movimentacoesFiltradas: any[] = [];
  filtro: any = { dataInicio: '', dataFim: '' };
  totalEntradas: number = 0;
  totalExclusoes: number = 0;

  constructor(private indexedDBService: IndexedDBService, private navCtrl: NavController) {}

  ngOnInit() {
    this.indexedDBService.getProdutos().then(produtos => {
      this.produtos = produtos;
    });

    this.loadMovimentacoes();
  }
  
  goBack() {
    this.navCtrl.back();
  }
  
  loadMovimentacoes() {
    this.indexedDBService.getMovimentacoes().then(movs => {
      this.movimentacoes = movs;
      this.movimentacoesFiltradas = movs;
    });
  }

  onFilter() {
    const dataInicio = new Date(this.filtro.dataInicio);
    const dataFim = new Date(this.filtro.dataFim);

    this.movimentacoesFiltradas = this.movimentacoes.filter(mov => {
      const dataMov = new Date(mov.data_movimentacao);
      return dataMov >= dataInicio && dataMov <= dataFim;
    });

    this.calculateTotals();
  }

  calculateTotals() {
    this.totalEntradas = this.movimentacoesFiltradas
      .filter(mov => mov.tipo_movimentacao === 'entrada')
      .reduce((acc, mov) => acc + mov.quantidade_movimentada, 0);

    this.totalExclusoes = this.movimentacoesFiltradas
      .filter(mov => mov.tipo_movimentacao === 'exclusao')
      .reduce((acc, mov) => acc + mov.quantidade_movimentada, 0);
  }

  onSubmit() {
    const now = new Date();

    if (this.movimentacao.tipo_movimentacao === 'entrada') {
      this.movimentacao.data_entrada = now;
    } else if (this.movimentacao.tipo_movimentacao === 'exclusao') {
      this.movimentacao.data_exclusao = now;
    }

    this.movimentacao.data_movimentacao = now;

    this.indexedDBService.addMovimentacao(this.movimentacao).then(() => {
      this.loadMovimentacoes();
      this.movimentacao = {};
    }).catch(error => {
      console.error('Erro ao adicionar movimentação:', error);
    });
  }
}
