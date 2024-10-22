import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from '../services/indexeddb.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  produto: any = {};
  produtos: any[] = [];
  categorias: any[] = [];
  estoques: any[] = []; 

  constructor(private indexedDBService: IndexedDBService, private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.loadCategorias();
    this.loadProdutos();
    this.loadEstoques(); 
  }

  // Carregar categorias
  loadCategorias() {
    this.indexedDBService.getCategorias().then((data) => {
      this.categorias = data;
    });
  }

  // Carregar estoques
  loadEstoques() {
    this.indexedDBService.getEstoques().then((data) => {
      this.estoques = data;
    });
  }

  // Carregar produtos
  loadProdutos() {
    this.indexedDBService.getProdutos().then((data) => {
      this.produtos = data;
    });
  }

  onSubmit() {
    // Certifique-se de que o id_estoque está sendo corretamente associado ao produto
    if (this.produto.id_estoque) {
      this.produto.id_estoque = this.produto.id_estoque;  // Associa o id_estoque selecionado
    }

    if (this.produto.id_produto) {
      // Atualizar produto existente
      this.indexedDBService.updateProduto(this.produto).then(() => {
        this.loadProdutos();
        this.produto = {};
      }).catch((error) => {
        console.error('Erro ao atualizar produto:', error);
      });
    } else {
      // Adicionar novo produto
      this.indexedDBService.addProduto(this.produto).then(() => {
        this.loadProdutos();
        this.produto = {};
      }).catch((error) => {
        console.error('Erro ao adicionar produto:', error);
      });
    }
  }

  // Editar produto
  editProduto(produto: any) {
    this.produto = { ...produto };
    // Recupera o estoque selecionado para o produto
    this.produto.id_estoque = produto.id_estoque;
  }

  // Excluir produto
  excluirProduto(id_produto: number) {
    this.indexedDBService.deleteProduto(id_produto).then(() => {
      this.loadProdutos();
    });
  }

  // Método para retornar o nome da categoria pelo ID
  getCategoriaNome(id_categoria: number): string {
    const categoria = this.categorias.find(cat => cat.id_categoria === id_categoria);
    return categoria ? categoria.nome_categoria : 'Categoria não encontrada';
  }
}
