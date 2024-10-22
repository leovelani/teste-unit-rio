import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from '../services/indexeddb.service'; 
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  categoria: any = {};  // Armazenar dados da categoria
  categorias: any[] = [];  // Armazenar categorias listadas
  estoques: any[] = [];  // Armazenar estoques disponíveis

  constructor(private indexedDBService: IndexedDBService, private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    // Carregar estoques e categorias diretamente do IndexedDB
    this.loadEstoques(); 
    this.loadCategorias(); 
  }

  // Método que será chamado quando o formulário for submetido
  onSubmit() {
    if (this.categoria.id_categoria) {
      // Atualizar a categoria existente
      this.indexedDBService.updateCategoria(this.categoria).then(() => {
        this.loadCategorias();
        this.categoria = {}; // Limpar o formulário após a atualização
      }).catch((error) => {
        console.error('Erro ao atualizar a categoria:', error);
      });
    } else {
      // Adicionar nova categoria
      this.indexedDBService.addCategoria(this.categoria).then(() => {
        this.categoria = {}; // Limpar o formulário após o salvamento
        this.loadCategorias(); // Recarregar as categorias após adicionar
      }).catch((error) => {
        console.error('Erro ao salvar categoria:', error);
      });
    }
  }

  // Carregar categorias do IndexedDB
  loadCategorias() {
    this.indexedDBService.getCategorias().then((categorias) => {
      this.categorias = categorias;
    }).catch((error) => {
      console.error('Erro ao carregar categorias:', error);
    });
  }
  
  // Método para carregar os estoques do IndexedDB
  loadEstoques() {
    this.indexedDBService.getEstoques().then((estoques) => {
      this.estoques = estoques;  // Armazenar estoques recuperados
    }).catch((error) => {
      console.error('Erro ao carregar estoques:', error);
    });
  }

  // Método para editar uma categoria
  editCategoria(categoria: any) {
    this.categoria = { ...categoria }; // Carregar dados da categoria no formulário para edição
  }

  // Método para excluir uma categoria
  deleteCategoria(id_categoria: number) {
    this.indexedDBService.deleteCategoria(id_categoria).then(() => {
      this.loadCategorias(); // Recarregar as categorias após excluir
    }).catch((error) => {
      console.error('Erro ao excluir categoria:', error);
    });
  }

  // Retornar o nome do estoque pelo ID
  getEstoqueNome(id_estoque: number): string {
    const estoque = this.estoques.find(estoque => estoque.id_estoque === id_estoque);
    return estoque ? estoque.nome_estoque : 'Estoque não encontrado';
  }
}