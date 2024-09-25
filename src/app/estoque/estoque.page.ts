import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.page.html',
  styleUrls: ['./estoque.page.scss'],
})
export class EstoquePage implements OnInit {

  estoque: any = {};  // Propriedade para armazenar os dados do estoque

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
  constructor() { }

  ngOnInit() {
  }

  // Método que será chamado quando o formulário for submetido
  onSubmit() {
    console.log('Estoque cadastrado:', this.estoque);

    // Simulação de salvamento dos dados em localStorage
    let estoques = JSON.parse(localStorage.getItem('estoques') || '[]');
    estoques.push(this.estoque);
    localStorage.setItem('estoques', JSON.stringify(estoques));

    // Limpar o formulário após o salvamento
    this.estoque = {};
  }
}
