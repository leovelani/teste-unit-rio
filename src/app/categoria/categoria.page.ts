import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  categoria: any = {};  

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
  categoria: any = {};  // Propriedade para armazenar os dados da categoria

  constructor() { }

  ngOnInit() {
  }

  // Método que será chamado quando o formulário for submetido
  onSubmit() {
    console.log('Categoria cadastrada:', this.categoria);

    // Aqui você pode adicionar a lógica para salvar os dados da categoria
    // Exemplo simples de salvamento em localStorage:
    let categorias = JSON.parse(localStorage.getItem('categorias') || '[]');
    categorias.push(this.categoria);
    localStorage.setItem('categorias', JSON.stringify(categorias));

    // Limpar o formulário após o salvamento
    this.categoria = {};
  }
}
