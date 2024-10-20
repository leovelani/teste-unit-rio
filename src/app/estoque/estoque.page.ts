import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IndexedDBService } from 'src/app/services/indexeddb.service';  

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.page.html',
  styleUrls: ['./estoque.page.scss'],
})
export class EstoquePage implements OnInit {

  estoque: any = {};  // Propriedade para armazenar os dados do estoque
  estoques: any[] = [];  // Para listar todos os estoques cadastrados

  constructor(private indexedDBService: IndexedDBService, private modalCtrl: ModalController) {}  // Injeção de dependência do IndexedDBService

  close() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.loadEstoques();  // Carregar estoques ao inicializar
  }

  // Método para carregar os estoques do IndexedDB
  loadEstoques() {
    this.indexedDBService.getEstoques().then((estoques) => {
      this.estoques = estoques;  // Armazenar estoques recuperados
    }).catch((error) => {
      console.error('Erro ao carregar estoques:', error);
    });
  }

  // Método que será chamado quando o formulário for submetido
  onSubmit() {
    // Verificar se estamos editando ou adicionando
    if (this.estoque.id_estoque) {
      // Atualizar o estoque existente
      this.indexedDBService.updateEstoque(this.estoque).then(() => {
        this.loadEstoques();
        this.estoque = {}; // Limpar o formulário
      }).catch((error) => {
        console.error('Erro ao atualizar o estoque:', error);
      });
    } else {
      // Adicionar novo estoque
      this.indexedDBService.addEstoque(this.estoque).then(() => {
        this.loadEstoques();
        this.estoque = {}; // Limpar o formulário
      }).catch((error) => {
        console.error('Erro ao salvar o estoque:', error);
      });
    }
  }

  // Método para editar um estoque
  editEstoque(estoque: any) {
    this.estoque = { ...estoque }; // Carregar dados do estoque no formulário para edição
  }

  // Método para excluir um estoque
  deleteEstoque(id_estoque: number) {
    this.indexedDBService.deleteEstoque(id_estoque).then(() => {
      // Após a exclusão, recarregar a lista de estoques
      this.loadEstoques();
    }).catch((error) => {
      console.error('Erro ao excluir o estoque:', error);
    });
  }
}
