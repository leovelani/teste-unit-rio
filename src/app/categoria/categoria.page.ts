import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from '../services/indexeddb.service'; // Importação do serviço IndexedDB
import { ModalController, NavParams  } from '@ionic/angular';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
  
})
export class CategoriaPage implements OnInit {

  categoria: any = {};  // Propriedade para armazenar os dados da categoria
  categorias: any[] = [];  // Propriedade para armazenar as categorias listadas
  estoques: any[] = [];  // Propriedade para armazenar os estoques disponíveis


  constructor(private indexedDBService: IndexedDBService, private modalCtrl: ModalController, private navParams: NavParams) {
    this.estoques = this.navParams.get('estoques'); 
  }

  close() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    if (!this.estoques || this.estoques.length === 0) {
      this.loadEstoques();
    }
    this.loadCategorias(); 
  }


  // Método que será chamado quando o formulário for submetido
  onSubmit() {
    console.log('Categoria cadastrada:', this.categoria);

    // Adicionar a nova categoria ao IndexedDB usando o serviço
    this.indexedDBService.addCategoria(this.categoria).then(() => {
      console.log('Categoria salva com sucesso.');
      this.categoria = {}; // Limpar o formulário após o salvamento
      this.loadCategorias(); // Recarregar as categorias após adicionar
    }).catch((error) => {
      console.error('Erro ao salvar categoria:', error);
    });
  }

  // Carregar categorias do IndexedDB
  loadCategorias() {
    this.indexedDBService.getCategorias().then((categorias) => {
      this.categorias = categorias;
    }).catch((error) => {
      console.error('Erro ao carregar categorias:', error);
    });
  }

  // Método para excluir uma categoria
  deleteCategoria(id_categoria: number) {
    this.indexedDBService.deleteCategoria(id_categoria).then(() => {
      console.log('Categoria excluída com sucesso.');
      this.loadCategorias(); // Recarregar as categorias após excluir
    }).catch((error) => {
      console.error('Erro ao excluir categoria:', error);
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
  
  getEstoqueNome(id_estoque: number): string {
    const estoque = this.estoques.find(estoque => estoque.id_estoque === id_estoque);
    return estoque ? estoque.nome_estoque : 'Estoque não encontrado';
  }
  
}
