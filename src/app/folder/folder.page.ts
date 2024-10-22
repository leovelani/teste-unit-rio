import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IndexedDBService } from '../services/indexeddb.service';
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
  public estoques: any[] = [];
  public selectedEstoque!: string;
  public produtos: any[] = [];
  public categorias: any[] = [];
  public produtosFiltrados: any[] = [];

  private activatedRoute = inject(ActivatedRoute);

  constructor(
    private indexedDBService: IndexedDBService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.loadEstoques();
    this.loadCategorias();
  }

  loadEstoques() {
    this.indexedDBService.getEstoques().then((estoques) => {
      this.estoques = estoques;
    }).catch((error) => {
      console.error('Erro ao carregar estoques:', error);
    });
  }

  loadCategorias() {
    this.indexedDBService.getCategorias().then((categorias) => {
      this.categorias = categorias;
    }).catch((error) => {
      console.error('Erro ao carregar categorias:', error);
    });
  }

  exibirProdutosPorEstoque(idEstoque: string) {
    if (idEstoque) {
      this.indexedDBService.getProdutos().then((produtos) => {
        this.produtos = produtos.filter(produto => produto.id_estoque === idEstoque);
        this.produtosFiltrados = [...this.produtos];
      }).catch((error) => {
        console.error('Erro ao carregar produtos:', error);
      });
    }
  }

  editProduto(produto: any) {
    this.router.navigate(['/produto/editar', produto.id_produto]); // Navega para a página de edição com parâmetros
  }

  excluirProduto(id_produto: number) {
    this.indexedDBService.deleteProduto(id_produto).then(() => {
      console.log('Produto excluído com sucesso');
      this.exibirProdutosPorEstoque(this.selectedEstoque); // Recarrega os produtos após exclusão
    }).catch((error) => {
      console.error('Erro ao excluir produto:', error);
    });
  }

  filterVencidos() {
    const hoje = new Date();
    this.produtosFiltrados = this.produtos.filter(produto => {
      const validade = new Date(produto.data_validade);
      return validade < hoje;
    });
  }

  filterProximosVencer() {
    const hoje = new Date();
    const proximoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, hoje.getDate());
    this.produtosFiltrados = this.produtos.filter(produto => {
      const validade = new Date(produto.data_validade);
      return validade >= hoje && validade <= proximoMes;
    });
  }

  async openEstoqueModal() {
    const modal = await this.modalCtrl.create({
      component: EstoquePage,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.nome_estoque) {
      this.loadEstoques();
    }
  }

  async openCategoriaModal() {
    const modal = await this.modalCtrl.create({
      component: CategoriaPage,
      componentProps: { estoques: this.estoques },
    });
    return await modal.present();
  }

  async openProdutoModal() {
    const modal = await this.modalCtrl.create({
      component: ProdutoPage,
    });
    return await modal.present();
  }

  validateAndNavigate() {
    const currentUrl = this.router.url;
    if (currentUrl !== '/movimentacoes') {
      this.router.navigate(['/movimentacoes']);
    }
  }

  listagemcompras() {
    const currentUrl = this.router.url;
    if (currentUrl !== '/lista-compras') {
      this.router.navigate(['/lista-compras']);
    }
  }

  getCategoriaNome(id_categoria: number): string {
    const categoria = this.categorias.find(cat => cat.id_categoria === id_categoria);
    return categoria ? categoria.nome_categoria : 'Categoria não encontrada';
  }
}
