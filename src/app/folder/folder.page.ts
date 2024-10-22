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

  // Carregar estoques disponíveis
  loadEstoques() {
    this.indexedDBService.getEstoques().then((estoques) => {
      this.estoques = estoques;
    }).catch((error) => {
      console.error('Erro ao carregar estoques:', error);
    });
  }

  // Método para carregar categorias
  loadCategorias() {
    this.indexedDBService.getCategorias().then((categorias) => {
      this.categorias = categorias;
    }).catch((error) => {
      console.error('Erro ao carregar categorias:', error);
    });
  }

  // Exibir produtos automaticamente ao selecionar o estoque
  exibirProdutosPorEstoque(idEstoque: string) {
    if (idEstoque) {
      this.indexedDBService.getProdutos().then((produtos) => {
        // Filtrar os produtos que pertencem ao estoque selecionado
        this.produtos = produtos.filter(produto => produto.id_estoque === idEstoque);
      }).catch((error) => {
        console.error('Erro ao carregar produtos:', error);
      });
    }
  }

  // Outros métodos, como abrir modais, navegação, etc.
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
      componentProps: {
        estoques: this.estoques 
      },
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