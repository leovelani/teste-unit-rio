import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from '../services/indexeddb.service';  // Importe o serviço
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  produto: any = {};  // Propriedade para armazenar os dados do produto
  produtos: any[] = [];  // Lista para armazenar todos os produtos
  categorias: any[] = [];  // Simulação de categorias disponíveis

  constructor(private indexedDBService: IndexedDBService, private modalCtrl: ModalController) {}  // Injete o serviço no construtor

  close() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    // Carregar categorias do IndexedDB
    this.loadCategorias();

    // Carregar todos os produtos do IndexedDB
    this.loadProdutos();
  }

  // Método para carregar as categorias do IndexedDB
  loadCategorias() {
    this.indexedDBService.getCategorias().then((data) => {
      this.categorias = data;
    });
  }

  // Método para carregar os produtos do IndexedDB
  loadProdutos() {
    this.indexedDBService.getProdutos().then((data) => {
      this.produtos = data;
    });
  }

  // Método que será chamado ao submeter o formulário
  onSubmit() {
    // Verificar se estamos editando ou adicionando
    if (this.produto.id_produto) {
      // Atualizar produto existente
      this.indexedDBService.updateProduto(this.produto).then(() => {
        this.loadProdutos();
        this.produto = {}; // Limpar o formulário após atualização
      }).catch((error) => {
        console.error('Erro ao atualizar produto:', error);
      });
    } else {
      // Adicionar novo produto
      this.indexedDBService.addProduto(this.produto).then(() => {
        // Após salvar o produto, recarregar a lista de produtos
        this.loadProdutos();
        this.produto = {}; // Limpar o formulário após o salvamento
      }).catch((error) => {
        console.error('Erro ao adicionar produto:', error);
      });
    }
  }

  // Método para editar um produto
  editProduto(produto: any) {
    this.produto = { ...produto }; // Carregar dados do produto para edição
  }
  
  // Método para excluir um produto
  excluirProduto(id_produto: number) {
    this.indexedDBService.deleteProduto(id_produto).then(() => {
      // Após a exclusão, recarregar a lista de produtos
      this.loadProdutos();
    });
  }

  // Método para retornar o nome da categoria pelo ID
  getCategoriaNome(id_categoria: number): string {
    const categoria = this.categorias.find(cat => cat.id_categoria === id_categoria);
    return categoria ? categoria.nome_categoria : 'Categoria não encontrada';
  }
}
